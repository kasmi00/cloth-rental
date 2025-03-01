import React, { useContext } from "react";
import fashionImage from "../../assets/fashion.webp";
import { DataContext } from "../../context/DataProvider";
import Footer from "../Footer/Footer";

import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const { account } = useContext(DataContext);
  return (
    <>
      <div
        className="container"
      // style={{ backgroundColor: "#ffe6e6" }}
      >
        <h1
          style={{ fontWeight: "bold", fontSize: "3rem", marginLeft: "20px" }}
        >
          Welcome to Outfit On Call
        </h1>
        <img
          className="clothing-image"
          src={fashionImage}
          alt="Clothing Image"
        />
        <div className="quotation">
          <p>
            <b>"Buy Less</b>
          </p>
          <p>
            <b>Wear More </b>
          </p>
          <p>
            <b>Start Renting"</b>
          </p>
        </div>
        {account.name ? (
          <Link to={"/rent"}>
            <button className="rent-button">Rent Now</button>
          </Link>
        ) : (
          <Link to={"/login"}>
            <button className="rent-button">Rent Now</button>
          </Link>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
