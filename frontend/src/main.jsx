import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchProvider from "./context/SearchProvider";
import { LocationProvider } from "./context/LocationProvider.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocationProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </LocationProvider>
  </React.StrictMode>
);
