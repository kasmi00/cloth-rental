import React, { useContext } from "react";
import { Card, Badge, Button } from "react-bootstrap";

import { API } from "../../../service/api";
import { DataContext } from "../../../context/DataProvider";

const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);

  if (!comment) {
    return <div style={{ marginTop: "50px" }}>Loading...</div>;
  }

  const removeComment = async () => {
    let response = await API.deleteComment(comment._id);
    if (response.isSuccess) {
      setToggle((prevState) => !prevState);
    }
  };

  return (
    <Card
      className="mt-3"
      style={{
        marginTop: "30px",
        background: "#e9dddd",
        padding: "10px",
        height: "100px",
      }}
    >
      <Card.Body>
        <div className="d-flex mb-2">
          <Card.Title
            className="font-weight-bold mr-3"
            style={{
              fontWeight: "600",
              fontSize: "18px",
              marginRight: "20px",
            }}
          >
            {comment.name}
          </Card.Title>
          <Badge
            bg="transparent"
            style={{
              fontSize: "14px",
              color: "#878787",
            }}
          >
            {new Date(comment.date).toDateString()}
          </Badge>
          {comment.name === account.name || account.role === "admin" ? (
            <Button
              variant="danger"
              className="ml-auto"
              style={{
                marginLeft: "auto",
              }}
              onClick={() => removeComment()}
            >
              Delete
            </Button>
          ) : null}
        </div>
        <Card.Text>{comment.comments}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comment;
