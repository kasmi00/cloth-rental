import React, { useContext, useState, useEffect } from "react";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { API } from "../../../service/api";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../context/DataProvider";

const LikePost = () => {
  const { id } = useParams();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { account } = useContext(DataContext);
  console.log("post id", id);
  console.log("user id", account._id);

  useEffect(() => {
    const fetchInitialLikes = async () => {
      try {
        // Fetch initial likes data from the server
        const response = await API.fetchLikes({
          userId: account._id,
          postId: id,
        });

        if (response.isSuccess) {
          setLikes(response.data.likes);
          setIsLiked(response.data.isLiked);
        }
      } catch (error) {
        console.error("Error fetching initial likes:", error);
      }
    };

    fetchInitialLikes();
  }, [account._id, id]);

  const handleLike = async () => {
    const userId = account._id;
    if (!isLiked) {
      const response = await API.addLike({
        userId: userId,
        postId: id,
      });
      if (response.isSuccess) {
        setLikes((prevLikes) => prevLikes + 1);
        console.log("Like added");
        setIsLiked(true);
      }
    } else {
      const response = await API.removeLike({
        userId: userId,
        postId: id,
      });
      if (response.isSuccess) {
        setLikes((prevLikes) => prevLikes - 1);
        setIsLiked(false);
      }
    }
  };
  return (
    <div>
      <span style={{ fontSize: "20px" }} onClick={handleLike}>
        {isLiked ? <FcLike color="red" /> : <FaRegHeart />}
      </span>
      <span style={{ marginLeft: "5px" }}>{likes}Likes</span>
    </div>
  );
};

export default LikePost;
