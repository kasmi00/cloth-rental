import React from "react";
import { Row, Col } from "react-bootstrap";
import "./Rent.css";
import Categories from "./Filter/Categories";
import Posts from "./Post/Posts";
import FilterByPrice from "./Filter/Price";
import FilterByGender from "./Filter/Gender";
import FilterBySize from "./Filter/Size";

const Rent = () => {
  return (
    <div className="rent-container">
      <Row className="rent-row">
        {/* Categories column takes 3 columns on large screens, 4 columns on medium screens, and 12 columns on small screens */}
        <Col
          lg={2}
          md={2}
          xs={12}
          // style={{ height: "100vh", overflowY: " auto" }}
        >
          <FilterByGender />
          <Categories />
          <FilterByPrice />
          <FilterBySize />
        </Col>
        {/* Posts column takes 9 columns on large screens, 8 columns on medium screens, and 12 columns on small screens */}
        <Col lg={10} md={10} xs={12}>
          <Posts />
        </Col>
      </Row>
    </div>
  );
};
export default Rent;
