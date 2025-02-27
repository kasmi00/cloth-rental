import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { categories } from "../../../constants/data";

const Categories = () => {
  const [toggleView, setToggleView] = useState(false);
  const handleToggleView = () => {
    setToggleView(!toggleView);
  };
  return (
    <ListGroup
      style={{
        marginTop: "5px",
        display: "grid",
      }}
    >
      <ListGroup.Item onClick={handleToggleView}>
        <Link to="/rent" style={{ textDecoration: "none", color: "black" }}>
          Rent by Category
        </Link>
      </ListGroup.Item>
      {toggleView &&
        categories.map((category) => (
          <ListGroup.Item key={category.id}>
            <Link
              to={`/rent?category=${category.type}`}
              style={{
                textDecoration: "none",
                color: "black",
                display: "block",
                padding: "8px",
              }}
            >
              {category.type}
            </Link>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default Categories;
