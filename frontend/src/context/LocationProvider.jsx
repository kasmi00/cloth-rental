// LocationContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [viewNearbyPosts, setViewNearbyPosts] = useState(false);
  const [isLocationPermissionDenied, setLocationPermissionDenied] =
    useState(false);
  const [nearby, setNearby] = useState("NearBy");
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationPermissionDenied(false);
          console.log(
            "User's current location :",
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setLocationPermissionDenied(true);
        },
        options
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported");
    }
  }, []);

  const updateUserLocation = (latitude, longitude) => {
    setUserLocation({ latitude, longitude });
  };

  const convertAddressToCoordinates = async (userAddress) => {
    try {
      const encodedLocation = encodeURIComponent(userAddress);
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${apiKey}`
      );

      const { results } = response.data;

      if (results.length > 0) {
        const { lat, lng } = results[0].geometry;
        console.log("😊😊 Coordinates set:", [lat, lng]);
        return [lat, lng];
      } else {
        console.error("No results found for the entered location.");
        setLocationError("Please enter the correct location");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error.message);
    }
  };

  const toggleViewNearbyPosts = async () => {
    if (isLocationPermissionDenied && !viewNearbyPosts) {
      const userAddress = prompt("Please enter your address:");
      console.log("User enterd address:", userAddress);
      const coordinates = await convertAddressToCoordinates(userAddress);
      if (coordinates) {
        setUserLocation({
          latitude: coordinates[0],
          longitude: coordinates[1],
        });
      }
    }
    setViewNearbyPosts((prev) => !prev);
    // toggel the inner text of button
    setNearby((prevNearby) => (prevNearby === "NearBy" ? "Explore" : "NearBy"));
  };
  useEffect(() => {
    console.log("nearer post:", viewNearbyPosts);
  }, [viewNearbyPosts]); // Log viewNearbyPosts when it changes

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        updateUserLocation,
        viewNearbyPosts,
        toggleViewNearbyPosts,
        nearby,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export { LocationProvider, useLocation };
