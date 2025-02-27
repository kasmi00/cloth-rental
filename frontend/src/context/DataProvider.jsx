import { createContext, useState, useEffect } from "react";
export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState({
    name: "",
    phone: "",
    image: "",
    role: "",
    _id: "",
  });
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  // Read data from localStorage on component mount
  useEffect(() => {
    const storedAccount = JSON.parse(localStorage.getItem("UserInfo"));
    const storedSelectedChat =
      JSON.parse(localStorage.getItem("selectedChats")) || null;
    const storedChats = JSON.parse(localStorage.getItem("chats"));

    if (storedAccount) {
      setAccount(storedAccount);
    }

    if (storedSelectedChat) {
      setSelectedChat(storedSelectedChat);
    }

    if (storedChats) {
      setChats(storedChats);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        account,
        setAccount,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;
