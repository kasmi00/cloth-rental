import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SearchContext } from "../../context/SearchProvider";
import { useContext } from "react";
import { API } from "../../service/api";
import { useNavigate } from "react-router";
import axios from "axios";
function Search() {
  const navigate = useNavigate();
  // const [suggestion, setSuggestion] = useState();

  const { setKeyword, setResult, keyword, result } = useContext(SearchContext);
  // const apiKey = import.meta.env.VITE_APP_API_KEY;
  // const handleAutocomplete = async (value) => {
  //   try {
  //     const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
  //       value
  //     )}&countrycode='Np'&key=${apiKey}`;

  //     const response = await axios.get(apiUrl);
  //     // extract only first word from suggestion without special characters
  //     const firstSuggestion = response.data.results.length
  //       ? response.data.results[0].formatted
  //           .split(" ")[0]
  //           .replace(/[^a-zA-Z ]/g, "")
  //       : "";
  //     setSuggestion(firstSuggestion);
  //   } catch (error) {
  //     console.error("Error fetching suggestions", error);
  //   }
  // };
  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setKeyword(value);
  //   // fetch address suggestions
  //   handleAutocomplete(value);
  // };

  // const handleSelectSuggestion = (suggestion) => {
  //   console.log("Value of keyword", keyword);
  //   setKeyword(suggestion);
  //   console.log("Value of keyword", keyword);
  //   setSuggestion(" "); // clear suggestions after selecting one
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.SearchKeyword(keyword);
      setResult(response.data);
      navigate("/searchResult");
      setKeyword("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Row>
      <Col xs="auto">
        <Form.Control
          type="text"
          placeholder="Search"
          className=" mr-sm-2"
          value={keyword || ""}
          // onChange={handleInputChange}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {/* {suggestion && (
          <p
            onClick={handleSelectSuggestion}
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            {suggestion}
          </p>
        )} */}
      </Col>
      <Col xs="auto">
        <Button variant="info" type="submit" onClick={handleSubmit}>
          Search
        </Button>
      </Col>
    </Row>
  );
}

export default Search;
