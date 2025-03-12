const DetailTable = ({ elements }) => {
    if (!elements.lines.length) return <p className="text-gray-500 text-center mt-4">No line data available.</p>;
  
    // Function to calculate total line length
    const calculateLineLength = (coordinates) => {
      let length = 0;
      for (let i = 0; i < coordinates.length - 1; i++) {
        const [lat1, lon1] = coordinates[i];
        const [lat2, lon2] = coordinates[i + 1];
  
        // Basic Haversine formula for distance calculation
        const R = 6371; // Earth radius in km
        const toRad = (deg) => (deg * Math.PI) / 180;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        length += R * c;
      }
      return length.toFixed(2);
    };
  
    return (
      <div className="mt-6 p-4 border rounded shadow-md bg-white">
        <h2 className="text-lg font-semibold mb-3">Detailed View - Line Lengths</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Element Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total Length (km)</th>
            </tr>
          </thead>
          <tbody>
            {elements.lines.map((line, index) => {
              const coordinates = line.LineString.coordinates._text
                .trim()
                .split(" ")
                .map((c) => c.split(",").map(Number))
                .map(([lng, lat]) => [lat, lng]); // Convert to [lat, lng]
  
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
  
  export default DetailTable;
  