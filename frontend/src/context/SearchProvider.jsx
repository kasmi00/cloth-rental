import { createContext, useState } from "react";
export const SearchContext = createContext(null);

const SearchProvider = ({ children }) => {
  const [keyword, setKeyword] = useState(null);
  const [result, setResult] = useState([]);
  return (
    <SearchContext.Provider value={{ keyword, setKeyword, result, setResult }}>
      {children}
    </SearchContext.Provider>
  );
};
export default SearchProvider;
