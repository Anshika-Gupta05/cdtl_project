const XrayPreview = ({ image, onView }) => {
  if (!image) return null; // ✅ Prevent rendering when no image is selected

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-lg flex flex-col items-center text-white w-80 mt-6">
      <p className="text-lg font-medium mb-3">X-ray Preview</p>
      <button
        onClick={onView}
        className="cursor-pointer bg-white text-secondary px-3 py-1 text-sm rounded-md font-medium shadow-md hover:bg-gray-200"
      >
        View Whole File
      </button>
    </div>
  );
};

export default XrayPreview;
