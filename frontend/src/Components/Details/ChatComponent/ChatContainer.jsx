import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import { DataContext } from "../../../context/DataProvider";
import ChatInput from "./ChatInput";
import { API } from "../../../service/api";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ socket }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const { account, chats } = useContext(DataContext);
  console.log("dataprovider in chatcontainer", account);
  useEffect(() => {
    const fetchData = async () => {
      console.log("chat id", account._id, chats._id);

      if (chats) {
        try {
          const response = await API.allMessage({
            from: account._id,
            to: chats._id,
          });
          console.log("2nd time chat id", response.data);
          setMessages(response.data);
        } catch (err) {
          console.log("Error while fetching the messages", err);
        }
      }
    };

    fetchData();
  }, [chats]);

  const handleSendMsg = async (msg) => {
    const messaageObj = {
      to: chats._id,
      from: account._id,
      message: msg,
    };
    socket.current.emit("send-msg", messaageObj);
    setMessages((prevMessages) => [
      ...prevMessages,
      { fromSelf: true, message: msg },
    ]);
    try {
      await API.sendMessage(messaageObj);
    } catch (error) {
      console.log("Error while sending the message", error);
    }

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  //   const socketEventCallback = (msg) => {
  //     setArrivalMessage({ fromSelf: false, message: msg });
  //   };

  //   if (socket.current) {
  //     socket.current.on("msg-recieved", socketEventCallback);
  //   }

  //   return () => {
  //     if (socket.current) {
  //       socket.current.off("msg-recieved", socketEventCallback);
  //     }
  //   };
  // }, [socket]);

  useEffect(() => {
    if (socket.current) {
      console.log("Socket connected:", socket.current.connected);
      //   socket.current.off("msg-recieved");
      socket.current.on("msg-recieved", (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg,
        });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {chats && (
        <Container>
          {/* <div className="chat-headers">
            <div className="user-details">
              <Image
                style={{ height: "30px", width: "300px" }}
                src={chats.image}
                roundedCircle
              />
              <div className="username">
                <h4>{chats.name}</h4>
              </div>
            </div>
          </div> */}
          <span className="chat-headers">
            <span className="user-details">
              <Image
                style={{ height: "50px", width: "50px" }}
                src={chats.image}
                roundedCircle
              />
              <div
                style={{
                  textTransform: "capitalize",
                  color: "white",
                  fontSize: "20px",
                }}
                className="username"
              >
                {chats.name}
              </div>
            </span>
          </span>

          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content ">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {loading && <p>Sending message...</p>}
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    /* display: flex;
    justify-content: space-between;
    align-items: baseline;
    left: 0;
    padding: 0 2rem;
    position: absolute;
    margin-top: 2px; */
    /* .user-details {
      display: flex;
      align-items: center;
      gap: 1rem; */
    /* .image {
        img {
          height: 1rem;
        }
      } */
    /* .username {
      color: white;
      top: 50px;
    } */
    /* } */
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #141111;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #00ff481f;
      }
    }
  }
`;
export default ChatContainer;
