import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import ResultPage from "./pages/ResultPage";
import Navbar from "./Components/Navbar"; // Import Navbar
import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen mx-4 sm:mx-[10%]">
        <Navbar /> {/* Navbar will be shown on all pages */}
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/about" element={<AboutPage/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
