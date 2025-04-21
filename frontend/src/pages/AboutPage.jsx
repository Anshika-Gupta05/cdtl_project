import { motion } from "framer-motion";
import {
  FaFlask,
  FaChartLine,
  FaLungs,
  FaCode,
  FaDatabase,
  FaClinicMedical,
  FaBalanceScale,
  FaShieldAlt,
  FaMobileAlt,
} from "react-icons/fa";
import { GiLungs } from "react-icons/gi";

const AboutPage = () => {
  // Verified metrics from your evaluation
  const stats = [
    {
      name: "Pneumonia Detection",
      value: "99.62%",
      icon: <FaLungs className="text-blue-600" size={40} />,
      samples: "3,166 balanced images",
    },
    {
      name: "Tuberculosis Detection",
      value: "99.93%",
      icon: <GiLungs className="text-green-600" size={40} />,
      samples: "1,400 balanced images",
    },
    {
      name: "Fibrosis Detection",
      value: "99.31%",
      icon: <FaLungs className="text-purple-600" size={40} />,
      samples: "1,454 balanced images",
    },
  ];

  // Actual datasets used from your notebook
  const datasets = [
    {
      name: "Lung Disease Dataset (4 Types)",
      source: "Kaggle (omkarmanohardalvi)",
      samples: "6,423 images",
      usedFor: "General disease classification",
    },
    {
      name: "Chest X-ray Pneumonia",
      source: "Kaggle (paultimothymooney)",
      samples: "5,863 images",
      usedFor: "Pneumonia detection",
    },
    {
      name: "TB Chest X-ray Dataset",
      source: "Kaggle (tawsifurrahman)",
      samples: "3,500 images",
      usedFor: "Tuberculosis detection",
    },
    {
      name: "Pulmonary Fibrosis",
      source: "Kaggle (aryashetty29)",
      samples: "1,454 images",
      usedFor: "Fibrosis detection",
    },
  ];

  // Your actual model architecture
  const modelDetails = [
    {
      title: "Base Architecture",
      value: "DenseNet121",
      icon: <FaCode className="text-blue-500" size={24} />,
    },
    {
      title: "Framework",
      value: "PyTorch",
      icon: <FaFlask className="text-green-500" size={24} />,
    },
    {
      title: "Input Size",
      value: "224×224px",
      icon: <FaDatabase className="text-purple-500" size={24} />,
    },
    {
      title: "Training Time",
      value: "30 epochs",
      icon: <FaChartLine className="text-red-500" size={24} />,
    },
  ];

  // Your actual preprocessing steps
  const preprocessingSteps = [
    "Image resizing to 224×224",
    "Normalization (μ=[0.485,0.456,0.406], σ=[0.229,0.224,0.225])",
    "Data augmentation (rotation, flipping, color jitter)",
    "Class balancing (undersampling majority classes)",
    "Train/Val split (80/20)",
  ];

  return (
    <div className="bg-gradient-radial from-penta via-tertiary to-penta min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-secondary to-quarter py-24 px-4 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About RespiraScan
          </motion.h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            AI-powered diagnostic assistant for detecting lung diseases from
            chest X-rays
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-16 text-quarter">
          Model Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-quarter"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
              <p className="text-lg font-medium mb-2">{stat.name}</p>
              <p className="text-gray-600 mb-1">{stat.samples}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Datasets Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-quarter">
            Datasets Used
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {datasets.map((dataset, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow  border-t-4 border-quarter"
              >
                <h3 className="text-xl font-semibold mb-2">{dataset.name}</h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Source:</span> {dataset.source}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Samples:</span>{" "}
                  {dataset.samples}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Used for:</span>{" "}
                  {dataset.usedFor}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Model Architecture */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-quarter">
          Model Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <FaFlask className="mr-2 text-quarter" /> Technical Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modelDetails.map((detail, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm flex items-center border-l-4 border-quarter"
                >
                  <div className="mr-4">{detail.icon}</div>
                  <div>
                    <p className="text-sm text-gray-500">{detail.title}</p>
                    <p className="font-medium">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <FaBalanceScale className="mr-2 text-quarter" /> Preprocessing
              Steps
            </h3>
            <ul className="space-y-3">
              {preprocessingSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-quarter mr-2">•</span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Clinical Impact */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-quarter">
            Clinical Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaClinicMedical className="text-blue-500" size={32} />,
                title: "Early Detection",
                desc: "Identifies diseases at stages when treatment is most effective",
              },
              {
                icon: <FaShieldAlt className="text-green-500" size={32} />,
                title: "Reduced Workload",
                desc: "Helps radiologists prioritize urgent cases",
              },
              {
                icon: <FaMobileAlt className="text-purple-500" size={32} />,
                title: "Accessibility",
                desc: "Potential for deployment in resource-limited settings",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl text-center border-t-4 border-quarter"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Work */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-quarter">
          Future Directions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Expand to additional pulmonary conditions",
            "Incorporate 3D CT scan analysis",
            "Develop mobile application for field use",
            "Obtain regulatory approvals",
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-quarter"
            >
              <p className="text-gray-800">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
