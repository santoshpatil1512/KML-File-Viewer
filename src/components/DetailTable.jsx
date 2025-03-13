// DetailTable component receives 'elements' as a prop, which contains categorized KML elements
const DetailTable = ({ elements }) => {
  // If there are no LineString elements, show a message instead of an empty table
  if (!elements.lines.length) return <p className="text-gray-500 text-center mt-4">No line data available.</p>;

  // Function to calculate total length of a LineString using the Haversine formula
  const calculateLineLength = (coordinates) => {
    let length = 0; // Initialize total length variable
    
    // Loop through each pair of consecutive coordinates to compute segment distances
    for (let i = 0; i < coordinates.length - 1; i++) {
      const [lat1, lon1] = coordinates[i]; // First coordinate
      const [lat2, lon2] = coordinates[i + 1]; // Next coordinate

      // Constants for the Haversine formula
      const R = 6371; // Earth's radius in kilometers
      const toRad = (deg) => (deg * Math.PI) / 180; // Convert degrees to radians

      // Compute differences in latitude and longitude
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);

      // Haversine formula
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      // Calculate segment length and accumulate to total length
      length += R * c;
    }
    
    // Return the computed length rounded to 2 decimal places
    return length.toFixed(2);
  };

  return (
    // Main container with styling for spacing, borders, and shadows
    <div className="mt-6 p-4 border rounded shadow-md bg-white">
      {/* Section Heading */}
      <h2 className="text-lg font-semibold mb-3">Detailed View - Line Lengths</h2>

      {/* Table for displaying line details */}
      <table className="w-full border-collapse border border-gray-300">
        
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Element Type</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Total Length (km)</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {elements.lines.map((line, index) => {
            // Extract coordinates from the KML structure
            const coordinates = line.LineString.coordinates._text
              .trim() // Remove leading/trailing whitespace
              .split(" ") // Split into individual coordinate sets
              .map((c) => c.split(",").map(Number)) // Convert strings to numbers
              .map(([lng, lat]) => [lat, lng]); // Convert to [latitude, longitude] format

            return (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">LineString</td>
                <td className="border border-gray-300 px-4 py-2">{calculateLineLength(coordinates)} km</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Exporting the component for use in the application
export default DetailTable;
