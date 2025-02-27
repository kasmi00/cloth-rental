const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    rentPrice: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalRating: {
      type: String,
      default: 0,
    },
    location: {
      type: {
        type: String,
        required: true,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true, // Set default availability to true
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);
postSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("post", postSchema);
