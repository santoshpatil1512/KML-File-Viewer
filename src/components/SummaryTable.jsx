// SummaryTable component receives 'elements' as a prop, which contains categorized KML elements
const SummaryTable = ({ elements }) => {
  return (
    // A container div with styling for borders, padding, and shadow effects
    <div className="border p-4 mt-4 rounded-lg shadow-md">
      
      {/* Section Heading */}
      <h2 className="text-lg font-bold">Summary</h2>

      {/* Table for displaying element types and their counts */}
      <table className="w-full border-collapse border">
        
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Element Type</th> {/* Column for element type */}
            <th className="border p-2">Count</th> {/* Column for count of elements */}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {/* Iterate over the keys (element categories: points, lines, polygons) */}
          {Object.keys(elements).map((key) => (
            <tr key={key}>
              <td className="border p-2">{key}</td> {/* Display element type */}
              <td className="border p-2">{elements[key].length}</td> {/* Display count of elements */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Exporting the component to be used in other parts of the application
export default SummaryTable;
