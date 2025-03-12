import { xml2js } from "xml-js";

export const parseKML = (kmlString) => {
  const json = xml2js(kmlString, { compact: true });
  const elements = { points: [], lines: [], polygons: [] };

  if (json.kml?.Document?.Placemark) {
    const placemarks = Array.isArray(json.kml.Document.Placemark)
      ? json.kml.Document.Placemark
      : [json.kml.Document.Placemark];

    placemarks.forEach((placemark) => {
      if (placemark.Point) {
        elements.points.push(placemark);
      } else if (placemark.LineString) {
        elements.lines.push(placemark);
      } else if (placemark.Polygon) {
        elements.polygons.push(placemark);
      }
    });
  }

  return elements;
};
