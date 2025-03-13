import { useState } from "react";
import { parseKML } from "../utils/parseKML";

const FileUpload = ({ onFileParsed }) => {
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".kml")) {
      const reader = new FileReader(); //
      reader.onload = (e) => {
        try {
          const result = parseKML(e.target.result);
          onFileParsed(result);
        } catch (err) {
          setError("Invalid KML file");
        }
      };
      reader.readAsText(file);
    } else {
      setError("Please upload a valid .kml file");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <input type="file" onChange={handleFileUpload} accept=".kml" className="border p-2" />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
