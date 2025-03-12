const SummaryTable = ({ elements }) => {
    return (
      <div className="border p-4 mt-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Summary</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Element Type</th>
              <th className="border p-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(elements).map((key) => (
              <tr key={key}>
                <td className="border p-2">{key}</td>
                <td className="border p-2">{elements[key].length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default SummaryTable;
  