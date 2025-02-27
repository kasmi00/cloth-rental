import React from "react";
import MyImage from "../../assets/aboutusimage.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";

const paragraphStyle = {
  fontFamily: "Arial, sans-serif",
  fontSize: "19px",
  lineHeight: "1.5",
  color: "#333", // Text color
  backgroundColor: "#f9f9f9", // Background color
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};
const buttonStyle = {
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "white",
  padding: "10px 2px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginLeft: " 100px",
};

const About = () => {
  const { account } = useContext(DataContext);
  return (
    <>
      <div
        className="container"
        // style={{ backgroundColor: "#ffe6e6" }}
      >
        <div className="row">
          <div className="col-md-8 ">
            <img
              src={MyImage}
              alt=""
              className="img-fluid rounded custom-image"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <p style={paragraphStyle}>
              Our platform, the Clothing Rental System, leverages the power of
              technology to simplify the process of finding and renting
              clothing. It empowers users to explore and access a diverse range
              of clothing items, while also enabling individuals to showcase
              their fashion collections, fostering a community of
              fashion-conscious users.Also establishes a direct relationship
              between lenders (those offering clothing for rent) and renters
              (those seeking stylish attire).We aim to make fashion accessible,
              sustainable, and convenient for everyone.
            </p>
            {account.name ? (
              <Link to="/rent">
                <button style={buttonStyle}>Get Started</button>
              </Link>
            ) : (
              <Link to="/login">
                <button style={buttonStyle}>Get Started</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
