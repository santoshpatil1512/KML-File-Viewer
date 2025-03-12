import { useState } from "react";
import FileUpload from "./components/FileUpload";
import SummaryTable from "./components/SummaryTable";
import DetailTable from "./components/DetailTable";
import MapView from "./components/MapView";

const App = () => {
  const [elements, setElements] = useState({ points: [], lines: [], polygons: [] });
  const [showSummary, setShowSummary] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">KML File Viewer</h1>

      {/* File Upload Section */}
      <FileUpload onFileParsed={setElements} />

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setShowSummary(!showSummary)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
        >
          {showSummary ? "Hide Summary" : "Show Summary"}
        </button>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {/* Conditional Rendering Based on Button Clicks */}
      {showSummary && <SummaryTable elements={elements} />}
      {showDetails && <DetailTable elements={elements} />}

      {/* Always Show Map */}
      <MapView elements={elements} />
    </div>
  );
};

export default App;
