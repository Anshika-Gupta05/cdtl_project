
import { useLocation, useNavigate } from "react-router-dom";
import {FaArrowLeft } from "react-icons/fa";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    originalImage,
    predictions = {},
    gradcamImages = {},
    highestDisease = "",
    highestConfidence = 0
  } = location.state || {};

  if (!originalImage) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go Back to Upload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-tertiary p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-center text-quarter mb-2">
            Prediction Result
          </h1>
          
          {highestDisease && (
            <h2 className="text-xl text-center text-red-600 font-semibold mb-8">
              Highest probability: {highestDisease} (Confidence: {highestConfidence.toFixed(2)})
            </h2>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-quarter mb-4 text-center">
              Uploaded X-ray
            </h2>
            <div className="flex justify-center">
              <img 
                src={`data:image/png;base64,${originalImage}`}
                alt="Uploaded X-ray" 
                className="max-w-full h-auto rounded-lg shadow-lg max-h-96"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {['Pneumonia', 'Tuberculosis', 'Fibrosis'].map((disease) => (
              <div key={disease} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-center text-quarter mb-4">
                  {disease}
                </h3>
                {gradcamImages[disease] && (
                  <img 
                    src={`data:image/png;base64,${gradcamImages[disease]}`}
                    alt={`${disease} Heatmap`}
                    className="w-full h-auto rounded-lg shadow mb-4"
                  />
                )}
                <p className="text-center font-medium text-quarter">
                  {predictions[disease]?.label || 'N/A'} 
                  {predictions[disease]?.confidence && (
                    <span> (Confidence: {predictions[disease].confidence.toFixed(2)})</span>
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => navigate("/")}
            className="bg-secondary hover:bg-quarter text-white font-medium py-3 px-8 rounded-lg flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Scan Another X-ray
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

