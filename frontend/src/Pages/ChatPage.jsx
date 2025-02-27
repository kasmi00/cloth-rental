import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { SideDrawer } from "../Components/Miscellaneous/SideDrawer";
import { DataContext } from "../context/DataProvider";
import Contacts from "../Components/Details/ChatComponent/Contacts";
import { API } from "../service/api";
import ChatContainer from "../Components/Details/ChatComponent/ChatContainer";
import { io } from "socket.io-client";
const Chatpage = () => {
  const socket = useRef();
  const { account, chats, setChats } = useContext(DataContext);
  const [contacts, setContacts] = useState([]);
  const host = import.meta.env.VITE_APP_HOST;

  console.log("User Id ", account._id);
  console.log("User Info", account);

  // Load chat data from local storage
  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem("chats"));
    if (storedChats) {
      setChats(storedChats);
    }
  }, [setChats]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        if (!account._id) {
          return;
        }
        const response = await API.getAllUsers(account._id);
        console.log("All users from database:", response.data);
        if (isMounted && response && response.isSuccess) {
          setContacts(response.data);
        }
        console.log("Conatct details", contacts);
      } catch (error) {
        console.error("Error while fetching users", error.message);
      }
    };

    fetchData();
    // cleanup function
    return () => {
      isMounted = false;
    };
  }, [account]);

  useEffect(() => {
    if (account) {
      socket.current = io(host);

      socket.current.emit("add-user", account._id);
      // return () => {
      //   socket.current.disconnect();
      // };
    }
  }, [account]);

  const handleChatChange = (chat) => {
    setChats(chat);
  };
  useEffect(() => {
    if (chats) {
      localStorage.setItem("chats", JSON.stringify(chats));
    }
  }, [chats]);
  console.log("chat", chats);
  return (
    <>
      {account && (
        <SideDrawer contacts={contacts} changeChat={handleChatChange} />
      )}
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {chats.length === 0 ? (
            <div
              className="welcome"
              style={{
                position: "absolute",
                top: "65%",
                left: "65%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                fontSize: "2.5rem",
                justifyContent: "center",
                color: "white",
              }}
            >
              Welcome {account.name} !!
            </div>
          ) : (
            <ChatContainer
              socket={socket}
              // changeChat={handleChatChange}
            />
          )}
        </div>
      </Container>
    </>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  background-color: #a9a9b9;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #dbbbbb76;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chatpage;
