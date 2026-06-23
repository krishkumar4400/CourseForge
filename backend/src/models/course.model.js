import mongoose, { model, models, Schema } from "mongoose";
import { AvailableCourseLevels, CourseLevelEnum } from "../utils/constants.js";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      minLength: [5, "Course title must contain at least 5 characters"],
      maxLength: [100, "Course title cannot exceed 100 characters"],
    },
    subTitle: {
      type: String,
      trim: true,
      maxLength: [200, "Course title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: [true, "Course Thumbnail is required"],
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
      enum: {
        values: AvailableCourseLevels,
        message: "Please select a valid course level",
      },
      default: CourseLevelEnum.BEGINNER,
    },

    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: [0, "Course price must be a non-negative number"],
    },

    language: {
      type: String,
      required: [true, "Language is required"],
      default: "English",
    },

    courseDuration: {
      type: Number,
      required: [true, "Course duration is required"],
      trim: true,
    },

    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Course instructor is required"],
      trim: true,
    },

    lectures: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },

    totalLectures: {
      type: Number,
      default: 0,
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

courseSchema.virtual("averageRating").get(function() {
  return 0; // placeholder assignment
});

courseSchema.pre("save", function() {
  if(this.lectures) {
    this.totalLectures = this.lectures.length || 0;
  }
})

const courseModel = models.Course || model("Course", courseSchema);
export default courseModel;

