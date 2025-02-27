import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
import "./Lend.css";
import { API } from "../../service/api";
const InitialPost = {
  category: "",
  size: "",
  image: "",
  gender: "",
  rentPrice: "",
  name: "",
  phone: "",
  location: "",
  description: "",
  createDate: new Date(),
  coordinates: [],
};
const Lend = () => {
  const [post, setPost] = useState(InitialPost);
  const [rentPriceError, setRentPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [uploadImageError, setuploadImageError] = useState("");
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        // Check if the selected file is a valid image (jpg or png)
        if (file.type === "image/jpeg" || file.type === "image/png") {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          // API Call
          const response = await API.uploadFile(data);
          console.log("hello", response);
          post.image = response.data;

          setuploadImageError("");
        } else {
          setuploadImageError("please upload png or jpg image");
        }
      }
    };
    getImage();
  }, [file]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const address = post.location;
    // validate the form
    if (name === "rentPrice" && !/^\d+$/.test(value)) {
      setRentPriceError("Rental price must contain only digits.");
    } else {
      setRentPriceError(""); // Clear the error message if the input is valid
    }
    if (name === "description" && !/^[a-zA-Z0-9\s]{30,}$/.test(value)) {
      setDescriptionError(
        "Descrption should contain atleast 30 character containing only digits and character"
      );
    } else {
      setDescriptionError(""); // Clear the error message if the input is valid
    }
    if (name === "location" && !/^[a-zA-Z0-9\s,]{5,}$/.test(value)) {
      setLocationError("Invalid location");
    } else {
      setLocationError(""); // Clear the error message if the input is valid
    }
    if (name === "type" && !/^[a-zA-Z\s,]{3,}$/.test(value)) {
      setTypeError("Invalid clothing type");
    } else {
      setTypeError(""); // Clear the error message if the input is valid
    }
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
      name: account.name,
      phone: account.phone,
      userId: account._id,
      profilePic: account.image,
      address: address,
    }));
  };
  const convertAddressToCoordinates = async () => {
    if (post.location) {
      try {
        const encodedLocation = encodeURIComponent(post.location);
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${apiKey}`
        );

        const { results } = response.data;

        if (results.length > 0) {
          const { lat, lng } = results[0].geometry;
          setPost((prevPost) => ({
            ...prevPost,
            coordinates: [lat, lng],
          }));
          console.log("😊😊 Coordinates set:", [lat, lng]);
          //console.log("🤦‍♀️🤦‍♀️ Post details", post);
          // Return the coordinates so that they can be used in the handleSubmit function
          return [lat, lng];
        } else {
          console.error("No results found for the entered location.");
          setLocationError("Please enter the correct location");
        }
      } catch (error) {
        console.error("Error fetching geocoding data:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request:", error.request);
        }
      }
    }
    return []; // Return empty array  if no coordinates are found
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert address to coordinates before submitting
    const coordinates = await convertAddressToCoordinates();
    console.log("Coordinates from convertAddressToCoordinates:", coordinates);
    if (coordinates.length === 2) {
      const newPost = { ...post, coordinates };
      console.log("Updated post state with coordinates:", newPost);
      const response = await API.createPost(newPost);
      console.log("Response:", response);
      if (response && response.isSuccess) {
        console.log("frontend", response);
        navigate("/rent");
      }
    }
  };

  return (
    <div
    // style={{ marginTop: "-10px" }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Lend Form</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <span>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={post.category}
              onChange={handleInputChange}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="casual-wear">Casual Wear</option>
              <option value="wedding-wear">Wedding Wear</option>
              <option value="outer-wear">Outer Wear</option>
              <option value="other">Other</option>
            </select>
          </span>
          <span>
            <label htmlFor="size">Size:</label>
            <select
              id="size"
              name="size"
              value={post.size}
              onChange={handleInputChange}
              required
            >
              <option value="">-- Select Size --</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XLL">XLL</option>
            </select>
          </span>
        </div>
        <div>
          <label htmlFor="rentPrice">Rent Price:</label>
          <input
            type="text"
            id="rentPrice"
            name="rentPrice"
            value={post.rentPrice}
            onChange={handleInputChange}
            placeholder="Enter the rent price per day in ruppess "
            required
          />
          {rentPriceError && (
            <div className="error-message">{rentPriceError}</div>
          )}
        </div>
        <label>Gender:</label>
        <div className="gender-options">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={post.gender === "male"}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="male">Male</label>

          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={post.gender === "female"}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="female">Female</label>

          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            checked={post.gender === "other"}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="other">Other</label>
        </div>
        <br></br>
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={post.type}
          onChange={handleInputChange}
          required
          placeholder="example:Shirt, Pant, Lehenga"
        />
        {typeError && <div className="error-message">{typeError}</div>}
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          id="description"
          name="description"
          value={post.description}
          onChange={handleInputChange}
          placeholder="material,color and condition of clothes "
        />
        {descriptionError && (
          <div className="error-message">{descriptionError}</div>
        )}

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={post.location}
          onChange={handleInputChange}
          required
        />
        {locationError && <div className="error-message">{locationError}</div>}
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          {uploadImageError && (
            <div className="error-message">{uploadImageError}</div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Lend;
