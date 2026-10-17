"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import stylesheet to avoid broken tiles[cite: 54]
import L from "leaflet";

// Fix default Leaflet icon paths in Next.js bundler
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Automatically fits viewport around destination and courier coordinates[cite: 54]
function BoundsFitter({ destination, courier }) {
  const map = useMap();
  useEffect(() => {
    if (destination && courier) {
      const bounds = L.latLngBounds([destination, courier]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, destination, courier]);
  return null;
}

export default function DeliveryMap({ order }) {
  const { destination, courier, customer, area, etaMinutes } = order;

  return (
    <MapContainer
      center={destination}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "320px", width: "100%", borderRadius: "0.75rem" }} // Explicit height is required[cite: 54]
    >
      {/* Required OpenStreetMap Attribution[cite: 54] */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Destination Pin */}
      <Marker position={destination}>
        <Popup>
          <strong>Destination:</strong> {customer} ({area})
        </Popup>
      </Marker>

      {/* Courier Pin */}
      <Marker position={courier}>
        <Popup>
          <strong>Courier:</strong> Arriving in {etaMinutes} mins
        </Popup>
      </Marker>

      <BoundsFitter destination={destination} courier={courier} />
    </MapContainer>
  );
}