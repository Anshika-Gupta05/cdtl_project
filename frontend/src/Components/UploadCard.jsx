import { useState } from "react";

const UploadCard = ({ onUpload }) => {
  const [fileName, setFileName] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onUpload(file);
    } else if (isClicked) {
      setFileName("No file chosen");
    }
  };

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-lg flex flex-col text-white w-80">
      <label className="text-lg font-medium mb-2">Upload X-ray Image</label>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
        onClick={() => setIsClicked(true)}
      />

      {/* Smaller Upload Button */}
      <label
        htmlFor="fileInput"
        className="cursor-pointer bg-white text-secondary px-3 py-1 text-sm rounded-md font-medium shadow-md hover:bg-gray-200"
      >
        Choose File
      </label>

      {/* File Name Display */}
      {isClicked && (
        <p className="text-sm mt-2 w-full">
          {fileName ? fileName : <span>No file chosen</span>}
        </p>
      )}
    </div>
  );
};

export default UploadCard;
