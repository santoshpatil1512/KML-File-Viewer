// Importing necessary hooks and components
import { useState } from "react";
import FileUpload from "./components/FileUpload";  // Component to handle file uploads
import SummaryTable from "./components/SummaryTable"; // Component to display summary data
import DetailTable from "./components/DetailTable"; // Component to display detailed data
import MapView from "./components/MapView"; // Component to render the map with KML elements

const App = () => {
  // State to store parsed KML elements, initially empty arrays for points, lines, and polygons
  const [elements, setElements] = useState({ points: [], lines: [], polygons: [] });

  // State to control visibility of the Summary Table
  const [showSummary, setShowSummary] = useState(false);

  // State to control visibility of the Detail Table
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="p-6"> {/* Adding padding to the entire container */}
      <h1 className="text-2xl font-bold text-center mb-4">KML File Viewer</h1>

      {/* File Upload Component */}
      {/* When a file is parsed, it updates the 'elements' state */}
      <FileUpload onFileParsed={setElements} />

      {/* Action Buttons Section */}
      <div className="flex justify-center gap-4 mt-4"> {/* Centering buttons with gap */}
        
        {/* Toggle Summary Table Button */}
        <button
          onClick={() => setShowSummary(!showSummary)} // Toggles summary table visibility
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
        >
          {showSummary ? "Hide Summary" : "Show Summary"} {/* Dynamic text based on state */}
        </button>

        {/* Toggle Detail Table Button */}
        <button
          onClick={() => setShowDetails(!showDetails)} // Toggles detail table visibility
          className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition"
        >
          {showDetails ? "Hide Details" : "Show Details"} {/* Dynamic text based on state */}
        </button>
      </div>

      {/* Conditional Rendering of Summary and Detail Tables */}
      {showSummary && <SummaryTable elements={elements} />} {/* Only renders if showSummary is true */}
      {showDetails && <DetailTable elements={elements} />} {/* Only renders if showDetails is true */}

      {/* Always Render Map Component to Show KML Elements */}
      <MapView elements={elements} />
    </div>
  );
};

export default App; // Exporting the App component for use in index.js
