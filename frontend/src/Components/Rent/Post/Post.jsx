import React, { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import Rating from "../../Details/Rating/rating";
export const Post = ({ post }) => {
  const { account } = useContext(DataContext);
  return (
    <>
      <img className="image" src={post.image} alt="post" />
      <h4
        className="Price"
        style={{
          fontWeight: "bolder",
          textDecoration: "inherit",
          color: "black",
          textTransform: "capitalize",
        }}
      >
        Rs {post.rentPrice}
      </h4>
      <h4>
        <Rating stars={post.totalRating} />
      </h4>
      {/* <h4
        className="Type"
        style={{
          fontWeight: "lighter",
          textDecoration: "none",
          color: "black",
          textTransform: "capitalize",
        }}
      >
        {post.type}
      </h4> */}
    </>
  );
};
