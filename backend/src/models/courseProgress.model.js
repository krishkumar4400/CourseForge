import mongoose, { model, models, Schema } from "mongoose";

const lectureProgressSchema = new Schema(
  {
    lecture: {
      type: Schema.Types.ObjectId,
      ref: "Lecture",
      required: [true, "Lecture refrence is required"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    watchTime: {
      type: Number,
      default: 0,
    },
    lastWatched: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const courseProgressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User refrence is required"],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course refrence is required"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    lectureProgress: [lectureProgressSchema],
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// calculate course completion
courseProgressSchema.pre("save", function () {
  if (this.LectureProgress.length > 0) {
    const completedLecture = this.lectureProgress.filter(
      (lp) => lp.isCompleted,
    ).length;
    this.completionPercentage = Math.round(
      (completedLecture / this.lectureProgress.length) * 100,
    );
    this.isCompleted = this.completionPercentage === 100;
  }
  return;
});

// update last accessed
courseProgressSchema.methods.updateLastAccessed = function () {
  this.lastAccessed = Date.now();
  return this.save({ validateBeforeSave: false });
};

const courseProgressModel =
  models.CourseProgress || model("CourseProgress", courseProgressSchema);
export default courseProgressModel;
