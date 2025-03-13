// Importing the xml2js function from the "xml-js" library
import { xml2js } from "xml-js";

// Function to parse a KML file and extract Points, LineStrings, and Polygons
export const parseKML = (kmlString) => {
  // Convert the KML string into a JSON object with a compact format
  const json = xml2js(kmlString, { compact: true });

  // Initialize an object to store parsed KML elements
  const elements = { points: [], lines: [], polygons: [] };

  // Check if the KML file contains a "Document" with "Placemark" elements
  if (json.kml?.Document?.Placemark) {
    // Ensure "Placemark" is treated as an array (some KML files may have only one placemark)
    const placemarks = Array.isArray(json.kml.Document.Placemark)
      ? json.kml.Document.Placemark // If multiple Placemarks exist, use them as an array
      : [json.kml.Document.Placemark]; // If only one exists, wrap it in an array

    // Iterate over each Placemark and categorize it into points, lines, or polygons
    placemarks.forEach((placemark) => {
      if (placemark.Point) {
        elements.points.push(placemark); // Store Point elements
      } else if (placemark.LineString) {
        elements.lines.push(placemark); // Store LineString elements
      } else if (placemark.Polygon) {
        elements.polygons.push(placemark); // Store Polygon elements
      }
    });
  }

  // Return the categorized KML elements
  return elements;
};
