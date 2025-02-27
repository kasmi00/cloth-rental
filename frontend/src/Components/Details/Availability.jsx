import React, { useContext, useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import { API } from "../../service/api";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

const Availability = ({ postOwner }) => {
  const [toggleAvailability, setToggleAvailability] = useState("Available");
  const { id } = useParams();
  const { account } = useContext(DataContext);

  const handleAvailable = async () => {
    console.log(id);

    try {
      if (id && account._id === postOwner) {
        const response = await API.toggleAvailability({ id });
        console.log("Parsed Response:", response);

        if (!response) {
          console.error("Error: No response received");
          return;
        }

        if (response.isSuccess) {
          setToggleAvailability(
            response.data.isAvailable ? "Available" : "Not available"
          );
        }
      } else {
        console.log("User is not the post owner. Cannot toggle availability.");
      }
    } catch (error) {
      console.error("Error while changing the availability", error.message);
    }
  };

  return (
    <span>
      <Badge
        pill
        variant={toggleAvailability === "Available" ? "success" : "danger"}
        onClick={handleAvailable}
        disabled={account._id !== postOwner}
        style={{
          position: "absolute",
          top: 0,
          left: 180,
          cursor: account._id === postOwner ? "pointer" : "not-allowed",
        }}
      >
        {toggleAvailability}
      </Badge>
    </span>
  );
};

export default Availability;
