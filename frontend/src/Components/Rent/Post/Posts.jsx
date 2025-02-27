import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API } from "../../../service/api";
import { Post } from "./Post";
import { useLocation } from "../../../context/LocationProvider";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const gender = searchParams.get("gender");
  const maxRentPrice = searchParams.get("maxRentPrice");
  const size = searchParams.get("size");
  const { userLocation, viewNearbyPosts } = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (
          viewNearbyPosts &&
          userLocation &&
          userLocation.latitude &&
          userLocation.longitude
        ) {
          response = await API.getNearbyPosts({
            category: category || "",
            maxRentPrice: maxRentPrice || "",
            size: size || "",
            gender: gender || "",
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          });
        } else {
          console.log("maxrent price");
          response = await API.filterPost({
            category: category || "",
            maxRentPrice: maxRentPrice || "",
            size: size || "",
            gender: gender || "",
          });
          console.log("response in filter", response);
          // response = response.data;
          console.log("2nd response", response);
        }
        if (response.isSuccess) {
          setPosts(response.data);
        } else {
          console.log("No data property in response");
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [category, userLocation, viewNearbyPosts, maxRentPrice, size, gender]);

  return (
    <>
      <div className="card-container">
        {console.log("Post length", posts.length)}
        {posts.length ? (
          posts.map((post) => (
            <div key={post._id} className="card">
              <Link to={`details/${post._id}`}>
                <Post post={post} />
              </Link>
            </div>
          ))
        ) : (
          <div
            style={{
              alignContent: "center",
              backgroundColor: "lightgrey",
              margin: "30px 80px",
              fontSize: "15px",
            }}
          >
            {posts.length === 0 ? "No data available to display" : "Loading..."}
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
