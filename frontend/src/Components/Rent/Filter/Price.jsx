import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { priceRange } from "../../../constants/data";
const FilterByPrice = () => {
  const [toggleView, setToggleView] = useState(false);

  const handleToggleView = () => {
    setToggleView(!toggleView);
  };
  return (
    <ListGroup style={{ marginTop: "5px", display: "grid" }}>
      <ListGroup.Item onClick={handleToggleView}>
        <Link to="/rent" style={{ textDecoration: "none", color: "black" }}>
          Rent by Price
        </Link>
      </ListGroup.Item>
      {toggleView &&
        priceRange.map((price) => (
          <ListGroup.Item key={price.id}>
            <Link
              to={`/rent?maxRentPrice=${price.type}`}
              style={{
                textDecoration: "none",
                color: "black",
                display: "block",
                padding: "8px",
              }}
            >
              {`Rent under ${price.type}`}
            </Link>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default FilterByPrice;
