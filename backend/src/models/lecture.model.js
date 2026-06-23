import mongoose, { model, models, Schema } from "mongoose";
import { AvailableCourseLevels, CourseLevelEnum } from "../utils/constants.js";

const lectureSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Lecture title is required"],
      trim: true,
      minLength: [5, "Course title must contain at least 5 characters"],
      maxLength: [100, "Course title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxLength: [500, "Lecture description cannot exceed 500 characters"],
    },

    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
      trim: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    resources: {
      type: String,
      trim: true,
    },
    publicId: {
      type: String,
      required: [true, "Public id of video is required"],
    },
    isPreviewFree: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      required: [true, "Lecture order is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

lectureSchema.pre("save", function () {
  if (this.duration) {
    this.duration = Math.round(this.duration * 100) / 100;
  }
});

const lectureModel = models.Lecture || model("Lecture", lectureSchema);
export default lectureModel;
