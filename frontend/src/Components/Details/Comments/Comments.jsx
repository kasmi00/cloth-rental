import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";

import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";
import { useNavigate } from "react-router-dom";
//components
import Comment from "./Comment";

const initialValue = {
  name: "",
  postId: "",
  date: new Date(),
  comments: "",
};

const Comments = ({ post }) => {
  const [comment, setComment] = useState(initialValue);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  const { account } = useContext(DataContext);
  const navigate = useNavigate();

  const url = account.image
    ? account.image
    : "https://static.thenounproject.com/png/12017-200.png";

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await API.getAllComments(post._id);
        if (response.isSuccess) {
          setComments(response.data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };
    getData();
  }, [toggle, post]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.name,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const addComment = async (e) => {
    try {
      if (!account.name) {
        navigate("/login");
      } else {
        console.log("Adding comment:", comment);
        let response = await API.newComment({
          ...comment,
          name: account.name,
        });
        console.log("API Response:", response);

        if (response.isSuccess) {
          setComment(initialValue);
        }
        setToggle((prevState) => !prevState);
      }
    } catch (error) {
      console.error("Error adding comment:", error.message || error);
    }
  };

  return (
    <Container className="mt-5">
      <Row
        style={{
          backgroundColor: "#d4edda",
          marginTop: "-10px",
          display: "flex ",
        }}
      >
        <Col md={1}>
          <Image
            src={url}
            alt="dp"
            className="rounded-circle"
            style={{
              width: "50px",
              height: "50px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
        </Col>
        <Col md={8}>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Type Your Comment"
            style={{
              resize: "none",
              width: "100%",
              left: "5px",
              margin: "0 20px",
              height: "100px !important",
            }}
            value={comment.comments}
            onChange={(e) => handleChange(e)}
          />
        </Col>
        <Col md={3}>
          <Button
            variant="primary"
            size="md"
            style={{ height: 40, alignItems: "center", marginTop: "5px" }}
            onClick={(e) => addComment(e)}
            // disabled={!account.name}
          >
            Post
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              setToggle={setToggle}
            />
          ))}
      </Row>
    </Container>
  );
};

export default Comments;
