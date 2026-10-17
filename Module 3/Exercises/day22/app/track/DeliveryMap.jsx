"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet default icon asset fix for Next.js bundlers
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

// Helper to fit bounds around both the courier and destination markers
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
      style={{ height: "320px", width: "100%", borderRadius: "0.75rem" }}
    >
      {/* Exercise 2: Attribution is required by OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Destination Marker */}
      <Marker position={destination}>
        <Popup>
          <strong>Destination:</strong> {customer} ({area})
        </Popup>
      </Marker>

      {/* Courier Marker */}
      <Marker position={courier}>
        <Popup>
          <strong>Courier:</strong> Arriving in {etaMinutes} mins
        </Popup>
      </Marker>

      <BoundsFitter destination={destination} courier={courier} />
    </MapContainer>
  );
}