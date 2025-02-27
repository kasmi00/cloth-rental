import React, { useContext } from "react";
import { SearchContext } from "../context/SearchProvider";
import { Link } from "react-router-dom";
import { Post } from "../Components/Rent/Post/Post";
const SearchResult = () => {
  const { result } = useContext(SearchContext);
  return (
    <div className="container">
      <div className="text-center">
        <h1>Search Results</h1>
        <h6>{result && `Found ${result.length}`}</h6>
        <div className="card-container" style={{ marginLeft: "50px" }}>
          {result?.length ? (
            result.map((post) => (
              <div key={post._id} className="card">
                <Link
                  to={`details/${post._id}`}
                  onClick={() => console.log("Link clicked")}
                >
                  {/* {console.log("post id in search", post._id)} */}
                  <Post post={post} />
                </Link>
              </div>
            ))
          ) : (
            <div
              style={{
                backgroundColor: "lightgrey",
                margin: "30px 80px",
                fontSize: "15px",
              }}
            >
              No data available to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
