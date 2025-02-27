// API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded ,Please wait",
  },
  success: {
    title: "Success",
    message: "Data successfully loaded",
  },
  responseFailure: {
    title: "Error",
    message:
      "An error occured  while fetching response from the serrver. Please try again",
  },
  requestFailure: {
    title: "Error",
    message: "An error occurred while parsing request data ",
  },
  networkError: {
    title: "Error",
    message:
      "Unable to connect with the server . Please check internet connectivity",
  },
};

// API SERVICE CALL
// SAMPLE REQUEST
// NEED SERVICE CALL:{url:'/', method:'post/get/put/delete', params:true/false, query:true/fasle}
export const SERVICE_URL = {
  userSignup: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },
  getRefreshToken: { url: "/token", method: "POST" },

  uploadFile: { url: "/file/upload", method: "POST" },
  createPost: { url: "create", method: "POST" },
  getAllPosts: { url: "/posts", method: "GET", params: true },
  getPostById: { url: "post", method: "GET", query: true },
  updatePost: { url: "update", method: "PUT", query: true },
  deletePost: { url: "delete", method: "DELETE", query: true },

  getNearbyPosts: { url: "/near/posts", method: "GET", params: true },
  SearchKeyword: { url: "/search", method: "GET", query: true },
  filterPost: { url: "/filter", method: "GET", params: true },
  ratePost: { url: "/rate", method: "POST" },

  toggleAvailability: { url: "/available", method: "PATCH" },

  newComment: { url: "/comment/new", method: "POST" },
  getAllComments: { url: "comments", method: "GET", query: true },
  deleteComment: { url: "comment/delete", method: "DELETE", query: true },

  getAllUsers: { url: "/getAllUser", method: "GET", query: true },
  searchUser: { url: "/searchUser", method: "GET", params: true },
  sendMessage: { url: "/message", method: "POST" },
  allMessage: { url: "/message/", method: "GET", params: true },

  addLike: { url: "/like", method: "POST" },
  removeLike: { url: "/unlike", method: "POST" },

  userProfile: { url: "/profile", method: "POST" },
};
