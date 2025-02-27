import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, ListGroup } from "react-bootstrap";

const UserListItem = ({ user, handleFunction }) => {
  console.log("UsER INFormation", user);
  return (
    <ListGroup.Item
      onClick={handleFunction}
      action
      style={{
        cursor: "pointer",
        backgroundColor: "#E8E8E8",
        border: "none",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
      className="d-flex align-items-center text-black px-3 py-2"
    >
      <Image
        src={user.image}
        alt={user.name}
        roundedCircle
        className="mr-2"
        style={{ cursor: "pointer", width: "32px", height: "32px" }}
      />
      <span>{user.name}</span>
    </ListGroup.Item>
  );
};

export default UserListItem;
