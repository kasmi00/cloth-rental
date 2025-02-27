import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Post } from "../Rent/Post/Post";
import { API } from "../../service/api";

const Profile = () => {
  const { userId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  //   console.log("userId in profile", userId);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await API.userProfile({ userId: userId });
      setUserPosts(posts.data);
      //   console.log(posts.data);
    };

    fetchPosts();
  }, [userId]);
  const handlePostClick = (id) => {
    {
      navigate(`/rent/details/${id}`);
    }
  };

  return (
    <div>
      {userPosts.length > 0 && (
        <h3
          style={{
            marginTop: "20px",
            textTransform: "capitalize",
            alignItems: "center",
            fontFamily: "cursive",
          }}
        >{`Posts by ${userPosts[0].name}`}</h3>
      )}
      <div
        className="card-container"
        style={{
          alignContent: "center",
          margin: "20px 80px",
        }}
      >
        {userPosts.length ? (
          userPosts.map((post) => (
            <div
              key={post._id}
              className="card"
              onClick={() => handlePostClick(post._id)}
            >
              <Post post={post} />
              {/* <Link to={`details/${post._id}`}>
                <Post post={post} />
              </Link> */}
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
            {userPosts.length === 0
              ? "No data available to display"
              : "Loading..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
