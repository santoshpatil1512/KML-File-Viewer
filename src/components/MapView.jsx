// Import required components from react-leaflet
import { MapContainer, TileLayer, Polyline, Marker, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet's default CSS for proper rendering
import L from "leaflet"; // Import Leaflet for additional customizations

// Define a custom marker icon to use for point locations
const customMarker = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // URL of the default Leaflet marker icon
  iconSize: [25, 41], // Size of the marker icon
  iconAnchor: [12, 41], // Anchor point to correctly position the icon on the map
  popupAnchor: [1, -34], // Position of the popup relative to the marker
});

// MapView component receives `elements` prop, which contains points, lines, and polygons from the parsed KML file
const MapView = ({ elements }) => {
  
  // Function to convert coordinate strings from KML to Leaflet's [lat, lng] format
  const parseCoordinates = (coords) =>
    coords._text // Extracts coordinate string from KML object
      .trim() // Removes any leading/trailing whitespace
      .split(" ") // Splits the string into an array of coordinate sets (longitude, latitude)
      .map((c) => {
        const [lng, lat] = c.split(",").map(Number); // Splits each coordinate set and converts to numbers
        return [lat, lng]; // Leaflet uses [latitude, longitude] format (opposite of KML's [longitude, latitude])
      });

  return (
    // Leaflet MapContainer - Initializes the interactive map
    <MapContainer 
      center={[20, 77]} // Default map center coordinates (India's approximate center)
      zoom={5} // Default zoom level
      className="h-96 w-full rounded-lg border shadow-md" // Tailwind styles for responsiveness
    >
      {/* Add a tile layer to provide the base map (using OpenStreetMap) */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Render Points (Markers) */}
      {elements.points.map((point, index) => (
        <Marker 
          key={index} 
          position={parseCoordinates(point.Point.coordinates)[0]} // Extracts the first coordinate
          icon={customMarker} // Uses the custom marker icon
        >
          <Popup>{point.name?._text || "Point"}</Popup> {/* Displays a popup with the name or a default label */}
        </Marker>
      ))}

      {/* Render LineStrings (Polylines) */}
      {elements.lines.map((line, index) => (
        <Polyline 
          key={index} 
          positions={parseCoordinates(line.LineString.coordinates)} // Converts KML coordinates to Leaflet format
          color="blue" // Sets the polyline color
        >
          <Popup>{line.name?._text || "LineString"}</Popup> {/* Popup showing the name of the line */}
        </Polyline>
      ))}

      {/* Render Polygons */}
      {elements.polygons.map((polygon, index) => (
        <Polygon 
          key={index} 
          positions={parseCoordinates(polygon.Polygon.outerBoundaryIs.LinearRing.coordinates)} // Extracts polygon boundary coordinates
          color="red" // Border color of the polygon
          fillOpacity={0.4} // Makes the polygon slightly transparent
        >
          <Popup>{polygon.name?._text || "Polygon"}</Popup> {/* Popup showing the name of the polygon */}
        </Polygon>
      ))}
    </MapContainer>
  );
};

// Export the component so it can be used in App.js
export default MapView;
