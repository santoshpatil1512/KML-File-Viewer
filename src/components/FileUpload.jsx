// Importing necessary hooks and utility functions
import { useState } from "react";
import { parseKML } from "../utils/parseKML"; // Function to parse the KML file

// FileUpload Component
// Accepts `onFileParsed` as a prop, which is a function to update the parsed data in the parent component
const FileUpload = ({ onFileParsed }) => {
  // State to store error messages related to file upload
  const [error, setError] = useState("");

  // Function to handle file selection and reading
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    // Check if a file is selected and if it has a .kml extension
    if (file && file.name.endsWith(".kml")) {
      const reader = new FileReader(); // Create a FileReader to read the file content

      // Event handler that triggers once the file is fully read
      reader.onload = (e) => {
        try {
          const result = parseKML(e.target.result); // Parse the KML content
          onFileParsed(result); // Pass the parsed data to the parent component
        } catch (err) {
          setError("Invalid KML file"); // Set error message if parsing fails
        }
      };

      reader.readAsText(file); // Read the file as a text string
    } else {
      setError("Please upload a valid .kml file"); // Set error message if the file is not a KML
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      {/* File input field for uploading KML files */}
      <input
        type="file"
        onChange={handleFileUpload} // Calls handleFileUpload when a file is selected
        accept=".kml" // Restricts file selection to KML files
        className="border p-2"
      />
      
      {/* Display error message if there is any */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload; // Exporting the component for use in other parts of the app
