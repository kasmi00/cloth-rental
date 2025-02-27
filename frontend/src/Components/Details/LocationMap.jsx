import React, { useState, useEffect } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import markerIcon from "../../assets/marker-icon.png";

const LocationMap = ({ coordinate }) => {
  const latitude = coordinate[0];
  const longitude = coordinate[1];
  const [address, setAddress] = useState("");
  useEffect(() => {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const fetchData = async () => {
      try {
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
        const response = await axios.get(apiUrl);
        const firstResult = response.data.results[0];
        if (firstResult) {
          setAddress(firstResult.formatted);
        } else {
          setAddress("Address not found");
        }
      } catch (error) {
        console.error("Error fetching reverse geocoding data:", error);
        setAddress("Error fetching address");
      }
    };

    fetchData();
  }, [latitude, longitude]);

  const customIcon = new Icon({
    iconUrl: markerIcon,
    iconSize: [38, 38], // size of marker icon
  });
  return (
    <MapContainer center={coordinate} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinate} icon={customIcon}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;
