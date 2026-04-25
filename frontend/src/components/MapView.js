import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";



  return (
    <MapContainer
      center={positions[0] || [12.9716, 77.5946]}
      zoom={17}
      style={{ height: "300px", width: "100%", marginBottom: "1rem" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      <Polyline positions={positions} color="blue" weight={5} />

      {route.steps.map((step, index) => (
        <Marker key={index} position={[step.lat, step.lng]}>
          <Popup>
            {step.instruction} ({step.distance})
          </Popup>
        </Marker>
      ))}

      {/* Optional: highlight current step */}
      {positions[currentStepIndex] && (
        <Marker position={positions[currentStepIndex]}>
          <Popup>Current Step: {route.steps[currentStepIndex].instruction}</Popup>
        </Marker>
      )}

      <FitBounds positions={positions} />
    </MapContainer>
  );
};

export default MapView;
