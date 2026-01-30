"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import algeriaBounds from "@/data/algeria-bounds.json";

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

const ALGERIA_BOUNDS = algeriaBounds as unknown as L.LatLngBoundsExpression;
const ALGERIA_CENTER: L.LatLngExpression = [28.0, 2.8];
const DEFAULT_ZOOM = 5;
const FOCUS_ZOOM = 10;

/** Imperatively add/remove marker to avoid react-leaflet unmount race condition */
function MapMarker({ position }: { position: L.LatLngExpression }) {
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    // Create marker imperatively
    const marker = L.marker([0, 0]).addTo(map);
    markerRef.current = marker;

    return () => {
      const m = markerRef.current;
      markerRef.current = null;
      if (!m) return;

      // Avoid Leaflet crashing during map teardown
      try {
        if (map && (map as any)._loaded && (m as any)._map) {
          m.removeFrom(map);
        }
      } catch {
        // Ignore cleanup errors
      }
    };
  }, [map]);

  // Update position if it changes
  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;
    try {
      marker.setLatLng(position);
    } catch {
      // Ignore update errors
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
  const mapCenter: L.LatLngExpression =
    (center as L.LatLngExpression) || ALGERIA_CENTER;
  const zoom = center ? FOCUS_ZOOM : DEFAULT_ZOOM;

  return (
    <MapContainer
      center={ALGERIA_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}
      maxBounds={ALGERIA_BOUNDS}
      maxBoundsViscosity={1.0}
      minZoom={DEFAULT_ZOOM}
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
