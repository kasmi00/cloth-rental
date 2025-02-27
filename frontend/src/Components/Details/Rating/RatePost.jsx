import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { API } from "../../../service/api";
import Rating from "./rating";
function RatePost({ PostId, onRatingComplete }) {
  const [show, setShow] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const handleRate = async () => {
    try {
      const response = await API.ratePost({
        star: userRating,
        postId: PostId,
      });
      console.log("post rated successfully", response);
      if (response.isSuccess) {
        setUserRating(response.data.finalRatedPost.totalRating);
      }
      // close the modal
      handleClose();
      if (onRatingComplete) {
        onRatingComplete(response.data.finalRatedPost);
      }
    } catch (error) {
      console.error("Error while rate the post", error.message);
    }
  };
  // open the model automatically after 1 min
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 60000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Rate the Post
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "170px" }}>
            Rate the post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ marginLeft: "30px", fontSize: "1.5rem" }}>
          <Rating stars={userRating} setUserRating={setUserRating} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            style={{ marginRight: "150px" }}
            onClick={handleRate}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RatePost;
