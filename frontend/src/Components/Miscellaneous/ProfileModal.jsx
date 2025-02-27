import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileModal = ({ account, children }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {children ? (
        <span onClick={handleShow}>{children}</span>
      ) : (
        <i
          class="fa fa-eye"
          aria-hidden="true"
          onClick={handleShow}
          style={{ paddingLeft: "3px" }}
        ></i>
      )}

      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header closeButton> */}
        {/* <Modal.Title>{account.name}</Modal.Title> */}
        <Modal.Title>{account.name} </Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body>
          <img
            src={account.image}
            alt="Profile Picture"
            style={{ height: "50px", width: "50px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button colorSchema="blue" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ProfileModal;
