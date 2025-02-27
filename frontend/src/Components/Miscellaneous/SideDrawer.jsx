import React, { useState, useContext } from "react";
import { Dropdown, Button, Modal, Form, Toast, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataContext } from "../../context/DataProvider";
import ProfileModal from "./ProfileModal";
import { API } from "../../service/api";
import { ChatLoading } from "../Details/ChatComponent/ChatLoading";
import { useNavigate } from "react-router-dom";
import UserListItem from "../userAvatar/UserListItem";

export const SideDrawer = ({ contacts, changeChat }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const [show, setShow] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  // const [search, setSearch] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { account, setSelectedChat } = useContext(DataContext);
  const navigate = useNavigate();

  const logOutHandeler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleSearch = async () => {
    if (!search) {
      alert("please senter something to search");
    }

    try {
      setLoading(true);
      const response = await API.searchUser({
        search: search,
      });
      console.log("Search Response name:", response.data[0].name);
      if (response && response.isSuccess) {
        console.log("Search Response after saved:", response.data);
        setSearchResult(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("error while searching the user", error.message);
      alert("Failed to Load the Search Results");
    }
  };
  const changeCurrentChat = (index, contact) => {
    const { _id, name, image } = contact;
    setSelectedChat(index);
    setSelectedContact(index);
    localStorage.setItem("selectedChats", JSON.stringify(index));
    changeChat({ _id, name, image });
  };

  const modalStyle = {
    // margin: 0,
    // transform: 'translateX(-100%)',
    position: "fixed",
    top: 0,
    left: show ? 0 : "-100%",
    width: "20%",
    height: "100%",
  };

  const modalContentStyle = {
    height: "100vh",
    //  overflowY: 'auto',
    width: "100%",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          padding: "5px 10px",
          borderWidth: "5px",
        }}
      >
        <i className="fas fa-search" onClick={handleShow}></i>
        {/* { <span style={{padding:"4px", textAlign:"left" }}>
      Search User
      </span> } */}
        <span style={{ fontSize: "20px", fontFamily: "cursive" }}>
          Chat To Rent the Clothes
        </span>
        {/* <span>
          <i
            className="fa fa-bell"
            aria-hidden="true"
            style={{ right: "140px", position: "absolute" }}
          ></i>
        </span> */}

        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <i
              className="fa fa-user"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
            ></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <ProfileModal account={account}>
              <Dropdown.Item href="#/action-1">My Profile</Dropdown.Item>
            </ProfileModal>

            <Dropdown.Divider />
            <Dropdown.Item href="#/action-2" onClick={logOutHandeler}>
              LogOut
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* <Button variant="primary" onClick={handleShow}>
        {/* Open Drawer (Modal) */}
      {/* </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        style={modalStyle}
      >
        <Modal.Header closeButton>
          <Modal.Title>Search Users</Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalContentStyle}>
          <div style={{ display: "flex", paddingBottom: "2px" }}>
            <Form.Control
              type="text"
              placeholder=" Search by Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              style={{ marginLeft: "10px", height: "40px", width: "40px" }}
            >
              Go
            </Button>
          </div>

          {loading ? (
            <ChatLoading />
          ) : (
            searchResult?.map((user, index) => (
              <UserListItem
                key={user._id}
                user={{ _id: user._id, name: user.name, image: user.image }}
                handleFunction={() => changeCurrentChat(index, user)}
                isSelected={index === selectedContact}
              />
            ))
          )}

          {loadingChat && (
            <Spinner
              animation="border"
              variant="primary"
              className="ml-auto d-flex"
            />
          )}
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </>
  );
};
