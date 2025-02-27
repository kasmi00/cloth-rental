const Comment = require("../models/Comment");

// new comment save on database
const newComment = async (req, res) => {
  console.log("comment in server", req.body);
  try {
    const comment = await new Comment(req.body);
    comment.save();
    res.status(200).json({
      msg: "comment saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// fetch a comments  available on post
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// delete single comment from database
const deleteComment = async (req, res) => {
  try {
    console.log(" deleting comment");
    const comment = await Comment.findById(req.params.id);
    await comment.deleteOne();
    res.status(200).json("comment deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = { newComment, getComments, deleteComment };
