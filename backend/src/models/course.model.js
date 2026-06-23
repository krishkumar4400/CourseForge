import mongoose, { Schema } from "mongoose";
import { AvailableCourseLevels } from "../utils/constants";

const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Course title is required"],
    trim: true,
    minLength: [5, "Course title must contain at least 5 characters"],
  },
  subTitle: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    required: [true, "Slug title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    maxLength: [500, "Course description cannot exceed 500 characters"],
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required"],
    trim: true,
  },
  previewVideo: {
    type: String,
    required: [true, "Preview video is required"],
    trim: true,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Course category is required"],
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },

  level: {
    type: String,
    required: [true, "Course level is requried"],
    enum: AvailableCourseLevels,
  },

  language: {
    type: String,
    required: [true, "Language is required"],
    default: "English",
  },

  duration: {
    type: String,
    required: [true, "Course duration is required"],
    trim: true,
  },

  instructor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Course instructor is required"],
    trim: true,
  },
});
