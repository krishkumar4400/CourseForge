import mongoose, { model, models, Schema } from "mongoose";

const enrollmentSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      required: [true, "Enrolled Student is required"],
      ref: "User",
      trim: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      required: [true, "Enrolled Course is required"],
      ref: "Course",
      trim: true,
    },
    enrolledAt: {
      type: Date,
      required: [true, "Enrollment date is required"],
      default: Date.now,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const enrollmentModel =
  models.Enrollment || model("Enrollment", enrollmentSchema);

export default enrollmentModel;
