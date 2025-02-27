const express = require("express");
const router = express.Router();

const {
  signupUser,
  loginUser,
  allUsers,
  getAllUser,
  addLike,
  removeLike,
} = require("../controllers/user_controller");
const { uploadImage, getImage } = require("../controllers/image_controller");
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  getNearByPosts,
  searchItem,
  filterPost,
  rating,
  toggleAvailability,
  useProfile,
} = require("../controllers/post_controller");
const {
  newComment,
  getComments,
  deleteComment,
} = require("../controllers/comment_controller");

const upload = require("../middleware/upload");
const {
  authenticateToken,
  createNewToken,
} = require("../middleware/authenticateToken");

const {
  sendMessage,
  allMessage,
} = require("../controllers/message_controllers");

// routes to upload and get the images
router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);

// routes for login and signup
router.post("/signup", signupUser);
router.post("/login", loginUser);

router.post("/token", createNewToken);

//routes for searching the user
router.get("/searchUser", authenticateToken, allUsers);

// routes for get all user
router.get("/getAllUser/:id", authenticateToken, getAllUser);
// route for add and remove likes
router.post("/like", authenticateToken, addLike);
router.post("/unlike", authenticateToken, removeLike);
// routes for CRUD the post
router.post("/create", authenticateToken, createPost);
router.get("/posts", getAllPosts);
router.get("/post/:id", getPost);
router.put("/update/:id", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);

// route for get nearby post
router.get("/near/posts", getNearByPosts);
// routes for search based filter
router.get("/search/:keyword", searchItem);

// routes for filter the post
router.get("/filter", filterPost);
router.post("/rate", authenticateToken, rating);
// routes for comments
router.post("/comment/new", authenticateToken, newComment);
router.get("/comments/:id", authenticateToken, getComments);
router.delete("/comment/delete/:id", authenticateToken, deleteComment);

// routes for message
router.post("/message", authenticateToken, sendMessage);
router.get("/message/", authenticateToken, allMessage);

// route to toggel the availibity of clothes for rent
router.patch("/available", authenticateToken, toggleAvailability);

router.post("/profile", authenticateToken, useProfile);

module.exports = router;
