import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
const Rating = ({ stars, setUserRating }) => {
  const handleStarClick = (index) => {
    // add 1 to index to get the star value (because index has value 0,1,2,3,4)
    const clickedPosition = index + 1;
    const ratingValue =
      stars === clickedPosition ? clickedPosition - 0.5 : clickedPosition;
    // set the user rating
    setUserRating(ratingValue);
  };
  //   let stars = "3.7";
  const ratingStar = Array.from({ length: 5 }, (element, index) => {
    let number = index + 0.5;
    return (
      <span key={index} onClick={() => handleStarClick(index)}>
        {stars >= index + 1 ? (
          <FaStar color="#fff534" />
        ) : stars >= number ? (
          <FaStarHalfAlt color="#fff534" />
        ) : (
          <FaRegStar color="#fff534" />
        )}
      </span>
    );
  });
  return <div>{ratingStar}</div>;
};
export default Rating;
