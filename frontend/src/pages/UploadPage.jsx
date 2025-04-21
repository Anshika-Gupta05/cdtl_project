import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UploadCard from "../Components/UploadCard";
import XrayPreview from "../Components/XrayPreview";
import lung from "../assets/lung.png";

const UploadPage = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResults, setPredictionResults] = useState(null);
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    setImage(file);
    setPredictionResults(null);
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image); // MUST match Flask key

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/predict`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      setPredictionResults(result);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewResults = () => {
    if (predictionResults) {
      navigate("/result", {
        state: {
          originalImage: predictionResults.original_image,
          predictions: predictionResults.predictions,
          gradcamImages: predictionResults.gradcam_images,
          highestDisease: predictionResults.highest_disease,
          highestConfidence: predictionResults.highest_confidence,
        },
      });
    }
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row bg-gradient-radial from-primary via-tertiary to-primary px-6 md:px-10 lg:px-20 overflow-hidden items-center justify-center md:gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="md:w-1/2 flex flex-col items-center justify-center gap-4 sm:gap-4 md:gap-6 lg:gap-8 py-4 md:py-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut",
              staggerChildren: 0.3,
            },
          },
        }}
      >
        <motion.p
          className="text-2xl md:text-center lg:text-4xl text-quarter font-semibold leading-snug text-center"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 50 },
            },
          }}
        >
          Early Detection, Healthier Lungs
        </motion.p>
        <motion.p
          className="italic text-quarter text-md md:text-md font-light text-center"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 50, delay: 0.2 },
            },
          }}
        >
          Detect Pneumonia, Tuberculosis, and Pulmonary Fibrosis effortlessly
          <br />
          using AI-driven analysis of Chest X-rays.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          <UploadCard onUpload={handleFileSelect} />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
            },
          }}
        >
          <XrayPreview
            image={image}
            onView={() => window.open(URL.createObjectURL(image), "_blank")}
          />
        </motion.div>

        <motion.div
          className="flex justify-center"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.4 } },
          }}
        >
          {!predictionResults ? (
            <button
              onClick={handleAnalyze}
              disabled={!image || isLoading}
              className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                !image || isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-quarter hover:bg-secondary"
              }`}
            >
              {isLoading ? "Analyzing..." : "Analyze X-ray"}
            </button>
          ) : (
            <button
              onClick={handleViewResults}
              className="px-6 py-3 bg-quarter hover:bg-secondary text-white rounded-lg font-medium transition-colors"
            >
              View Results
            </button>
          )}
        </motion.div>
      </motion.div>

      <motion.div className="md:w-1/2 flex items-center justify-center md:py-[4rem]">
        <motion.img
          src={lung}
          alt="Lung Illustration"
          className="h-[18rem] md:h-[30rem] w-[19rem] md:w-[28rem] md:p-[1rem]"
          animate={{
            y: [0, -10, 0],
            transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default UploadPage;
