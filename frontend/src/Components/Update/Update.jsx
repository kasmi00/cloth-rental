import React from "react";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api";
const InitialPost = {
  category: "",
  size: "",
  image: "",
  gender: "",
  type: "",
  description: "",
  rentPrice: "",
  name: "",
  phone: "",
  location: "",
  createDate: new Date(),
  coordinates: [],
};

const Update = () => {
  const [post, setPost] = useState(InitialPost);
  const [imageurl, setImageUrl] = useState("");
  const [uploadImageError, setuploadImageError] = useState("");
  const { account } = useContext(DataContext);
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getPostById(id);
        setPost(response.data);
        setImageUrl(response.data.image);
        // Fetch location name from coordinates and update the post state
        const locationName = await convertCoordinatesToAddress(
          response.data.location.coordinates
        );
        console.log("previous coordinatesL:", response.data.location);
        console.log(
          "Previously enter location before update",
          response.data.location.coordinates
        );
        console.log("Location Name ", locationName);

        setPost((prevPost) => ({
          ...prevPost,
          location: locationName,
        }));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const getImage = async () => {
      try {
        if (file) {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          const response = await API.uploadFile(data);
          if (response.isSuccess) {
            post.image = response.data;
            setImageUrl(response.data);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getImage();
    post.name = account.name;
    post.phone = account.phone;
  }, [file]);

  const convertAddressToCoordinates = async () => {
    if (post.location) {
      try {
        const encodedLocation = encodeURIComponent(post.location);
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${apiKey}`
        );

        const { results } = response.data;
        console.log("Geocoding API Response 😣😣:", response.data);

        if (results.length > 0) {
          const { lat, lng } = results[0].geometry;
          setPost((prevPost) => ({
            ...prevPost,
            coordinates: [lat, lng],
          }));
          console.log("Coordinates set:", [lat, lng]);
          return [lat, lng];
        } else {
          console.error("No results found for the entered location.");
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
    return [];
  };
  const convertCoordinatesToAddress = async (coordinates) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${coordinates[0]}+${coordinates[1]}&key=${apiKey}`
      );

      const { results } = response.data;
      console.log("Reverse Geocoding API Response 😣😣:", response.data);

      if (results.length > 0) {
        const formattedAddress = results[0].formatted;
        console.log("Location set:", formattedAddress);
        return formattedAddress;
      } else {
        console.error("No results found for the coordinates.");
      }
    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      }
    }
    return "";
  };

  const updateBlogPost = async (e) => {
    e.preventDefault();
    const coordinates = await convertAddressToCoordinates();
    console.log("coordinates  of updat form👍👍 :", coordinates);
    if (coordinates.length === 2) {
      const updatedPost = {
        ...post,
        location: {
          coordinates: coordinates,
          type: "Point",
        },
      };
      try {
        const response = await API.updatePost(updatedPost);
        if (response.isSuccess) {
          navigate(`/rent/details/${post._id}`);
        } else {
          console.error("Error  updating the post:", response.message);
        }
      } catch (error) {
        console.error("Error updating post:", error.message);
      }
    } else {
      console.error("Invalid coordinates");
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  return (
    <>
      <div
        style={{
          // backgroundColor: "#ffe6e6",
          marginTop: "-10px",
        }}
      >
        <h1>Update Product</h1>
        <form>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              onChange={(e) => handleChange(e)}
              value={post.category}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="casual-wear">Casual Wear</option>
              <option value="wedding-wear">Wedding Wear</option>
              <option value="outer-wear">Outer Wear</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="rentPrice">Rent Price:</label>
            <input
              type="text"
              id="rentPrice"
              name="rentPrice"
              value={post.rentPrice}
              onChange={handleChange}
              required
            />
            {/* {rentPriceError && (
            <div className="error-message">{rentPriceError}</div>
          )} */}
          </div>

          <label>Gender:</label>
          <div className="gender-options">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={post.gender === "male"}
              onChange={handleChange}
              required
            />
            <label htmlFor="male">Male</label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={post.gender === "female"}
              onChange={handleChange}
              required
            />
            <label htmlFor="female">Female</label>

            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              checked={post.gender === "other"}
              onChange={handleChange}
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
            onChange={handleChange}
            required
            placeholder="example:Shirt, Pant, Lehenga"
          />
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={post.description}
            onChange={handleChange}
            placeholder="material,color and condition of clothes "
          />

          <label htmlFor="size">Size:</label>
          <input
            type="text"
            id="size"
            name="size"
            value={post.size}
            onChange={handleChange}
            required
            placeholder=" example: small, medium, large, x-large"
          />
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={post.location}
            onChange={handleChange}
            required
          />

          <div>
            {/* <img src={post.image|| imageUrl} alt="Post image" /> */}
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              name="file"
              accept="image/*"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setImageUrl(URL.createObjectURL(e.target.files[0]));
                <img src={imageurl || post.image} alt="Post image" />;
              }}
              required
            />

            {uploadImageError && (
              <div className="error-message">{uploadImageError}</div>
            )}
          </div>

          <button onClick={updateBlogPost} type="submit">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default Update;
