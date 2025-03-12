import { MapContainer, TileLayer, Polyline, Marker, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define custom marker icon (optional)
const customMarker = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapView = ({ elements }) => {
  const parseCoordinates = (coords) =>
    coords._text
      .trim()
      .split(" ")
      .map((c) => {
        const [lng, lat] = c.split(",").map(Number);
        return [lat, lng]; // Leaflet uses [lat, lng] format
      });

  return (
    <MapContainer center={[20, 77]} zoom={5} className="h-96 w-full rounded-lg border shadow-md">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Render Points */}
      {elements.points.map((point, index) => (
        <Marker key={index} position={parseCoordinates(point.Point.coordinates)[0]} icon={customMarker}>
          <Popup>{point.name?._text || "Point"}</Popup>
        </Marker>
      ))}

      {/* Render Lines */}
      {elements.lines.map((line, index) => (
        <Polyline key={index} positions={parseCoordinates(line.LineString.coordinates)} color="blue">
          <Popup>{line.name?._text || "LineString"}</Popup>
        </Polyline>
      ))}

      {/* Render Polygons */}
      {elements.polygons.map((polygon, index) => (
        <Polygon key={index} positions={parseCoordinates(polygon.Polygon.outerBoundaryIs.LinearRing.coordinates)} color="red" fillOpacity={0.4}>
          <Popup>{polygon.name?._text || "Polygon"}</Popup>
        </Polygon>
      ))}
    </MapContainer>
  );
};

export default MapView;
