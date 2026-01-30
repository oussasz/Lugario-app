"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: marketIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
}

/** Imperatively add/remove marker to avoid react-leaflet unmount race condition */
function MapMarker({ position }: { position: L.LatLngExpression }) {
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    // Create marker imperatively
    const marker = L.marker(position).addTo(map);
    markerRef.current = marker;

    return () => {
      // Safe cleanup: only remove if marker still has the map
      if (markerRef.current) {
        try {
          markerRef.current.remove();
        } catch {
          // Ignore cleanup errors
        }
        markerRef.current = null;
      }
    };
  }, [map, position]);

  // Update position if it changes
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(position);
    }
  }, [position]);

  return null;
}

/** Fly to new center when it changes */
function ChangeView({
  center,
  zoom,
}: {
  center: L.LatLngExpression;
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.flyTo(center, zoom, { duration: 0.5 });
    }
  }, [map, center, zoom]);
  return null;
}

const Map: React.FC<MapProps> = ({ center }) => {
  const mapCenter: L.LatLngExpression = (center as L.LatLngExpression) || [
    52, -0.09,
  ];
  const zoom = center ? 4 : 2;

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom={false}
      className={`h-full rounded-lg`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={mapCenter} zoom={zoom} />
      {center && <MapMarker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default Map;
