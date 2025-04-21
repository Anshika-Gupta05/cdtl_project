from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import base64
import torch
from dotenv import load_dotenv
import os
from utils.model_utils import load_model, predict_image, apply_gradcam

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)

frontend_url = os.environ.get("FRONTEND_URL")
CORS(app, origins=[frontend_url])

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
model_path = os.path.join(BASE_DIR, 'models', 'final_lung_disease_model.pth')

# Load model once globally
model = load_model(model_path)

def image_to_base64(img, format='PNG'):
    buffered = BytesIO()
    img.save(buffered, format=format)
    return base64.b64encode(buffered.getvalue()).decode('utf-8')

def annotate_image(image, predictions):
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()

    lines = []
    for disease, result in predictions.items():
        lines.append(f"{disease}: {result['label']} ({result['confidence']})")

    full_text = "\n".join(lines)
    color = (0, 255, 0) if any(res['confidence'] > 0.8 and res['label'] == 'Disease' for res in predictions.values()) else (255, 0, 0)

    draw.text((10, 10), full_text, fill=color, font=font)
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    if file.filename == '' or not file.filename.lower().endswith(('png', 'jpg', 'jpeg')):
        return jsonify({'error': 'Invalid file'}), 400

    try:
        image = Image.open(file.stream).convert('RGB')
    except Exception as e:
        return jsonify({'error': f'Error processing image: {str(e)}'}), 400

    predictions = predict_image(image, model)
    gradcam_maps = apply_gradcam(image.copy(), model)
    annotated_image = annotate_image(image.copy(), predictions)

    original_image_b64 = image_to_base64(image)
    annotated_b64 = image_to_base64(annotated_image, format='JPEG')
    gradcam_b64 = {name: image_to_base64(img, format='JPEG') for name, img in gradcam_maps.items()}

    max_disease = max(
        ((disease, info) for disease, info in predictions.items() if info['label'] == 'Disease'),
        key=lambda x: x[1]['confidence'],
        default=(None, None)
    )

    return jsonify({
        'original_image': original_image_b64,
        'annotated_image': annotated_b64,
        'predictions': predictions,
        'gradcam_images': gradcam_b64,
        'highest_disease': max_disease[0],
        'highest_confidence': max_disease[1]['confidence'] if max_disease[1] else 0
    })

@app.route('/')
def index():
    return '🚀 Lung Disease Detection Backend is running!', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
