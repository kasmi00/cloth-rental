export const getAccessToken = () => {
  // console.log(" TOKEN ✌️✌️", sessionStorage.getItem("accesstoken"));
  return sessionStorage.getItem("accesstoken");
};

export const getRefreshToken = () => {
  // console.log("🤷‍♀️🤷‍♀️", sessionStorage);
  // console.log(" REfresh Token😒😒", sessionStorage.getItem("refreshToken"));
  return sessionStorage.getItem("refreshToken");
};

// export const setAccessToken = (accesstoken) => {
//   console.log("before Updating token", accesstoken);
//   let updatedToken = sessionStorage.setItem(
//     "accesstoken",
//     `Bearer ${accesstoken}`
//   );
//   console.log("after updating token", updatedToken);
//   return updatedToken;
// };
export const setAccessToken = (accesstoken) => {
  console.log("before Updating token", accesstoken);
  sessionStorage.setItem("accesstoken", `Bearer ${accesstoken}`);
  const updatedToken = sessionStorage.getItem("accesstoken");
  console.log("after updating token 🤷‍♀️🤷‍♀️", updatedToken);
  return updatedToken;
};

export const setRefreshToken = (refreshToken) => {
  sessionStorage.setItem("refreshToken", ` ${refreshToken}`);
  const updatedToken = sessionStorage.getItem("refreshToken");
  console.log("after updating  refreshtoken✌️✌️", updatedToken);
  // return updatedToken;
};
export const getType = (value, body) => {
  if (value.params) {
    return { params: body };
  } else if (value.query) {
    if (typeof body === "object") {
      return { query: body._id };
    } else {
      return { query: body };
    }
  }
  return {};
};
