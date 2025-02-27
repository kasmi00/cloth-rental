import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";
export const ChatLoading = () => {
  const skeletonStyle = {
    height: "45px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    marginBottom: "10px",
  };
  return (
    <>
      <ListGroup>
        {[...Array(9)].map((_, index) => (
          <ListGroup.Item key={index} style={skeletonStyle}>
            {/* <Spinner animation="border" variant="primary" style={{marginBottom: '3px'}} />  */}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
