import React, { useContext, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../../../context/DataProvider";

const Contacts = ({ contacts, changeChat }) => {
  console.log("Received contacts:", contacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const { setSelectedChat } = useContext(DataContext);
  const changeCurrentChat = (index, contact) => {
    setSelectedChat(index);
    setSelectedContact(index);
    localStorage.setItem("selectedChats", JSON.stringify(index));
    changeChat(contact);
  };
  return (
    <ContactsContainer>
      {contacts.map((user, index) => (
        <ContactItem
          key={user._id}
          onClick={() => changeCurrentChat(index, user)}
          // isselected={index === selectedContact}
        >
          <UserImage src={user.image} alt={user.name} />
          <UserName>{user.name}</UserName>
        </ContactItem>
      ))}
    </ContactsContainer>
  );
};

const ContactsContainer = styled.div`
  height: 100%; // Ensure the container takes the full height
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  padding: 1rem;
  gap: 0.6rem;
  background-color: #827aaf;
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background-color: white;
  /* background-color: ${(props) =>
    props.isselected != null ? "#b3aecc" : "#fff"}; */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
  &:hover {
    transform: scale(1.05);
  }
`;

const UserImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.h3`
  margin-top: 0.5rem;
  font-size: 1rem;
  text-transform: capitalize;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    font-size: 0.9rem;
  }
`;

export default Contacts;
