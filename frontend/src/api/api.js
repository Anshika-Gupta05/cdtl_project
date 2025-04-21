// export const uploadImage = async (file) => {
//   const formData = new FormData();
//   formData.append("image", file);

//   const response = await fetch("http://127.0.0.1:5000/upload", {
//     method: "POST",
//     body: formData,
//   });

//   return await response.json();
// };
// api.js

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('http://127.0.0.1:5000/api/predict', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
