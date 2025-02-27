import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { sizeRange } from "../../../constants/data";
const FilterBySize = () => {
  const [toggleView, setToggleView] = useState(false);

  const handleToggleView = () => {
    setToggleView(!toggleView);
  };
  return (
    <ListGroup style={{ marginTop: "5px", display: "grid" }}>
      <ListGroup.Item onClick={handleToggleView}>
        <Link to="/rent" style={{ textDecoration: "none", color: "black" }}>
          Rent by Size
        </Link>
      </ListGroup.Item>
      {toggleView &&
        sizeRange.map((size) => (
          <ListGroup.Item key={size.id}>
            <Link
              to={`/rent?size=${size.type}`}
              style={{
                textDecoration: "none",
                color: "black",
                display: "block",
                padding: "8px",
              }}
            >
              {`Size ${size.type}`}
            </Link>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default FilterBySize;
