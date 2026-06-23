import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { AvailableUserTypes, UserTypeEnum } from "../utils/constants.js";

const userSchema = new Schema(
  {
    avatar: {
      type: String,
      default: `https://placehold.co/200x200`,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unqiue: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minLength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    isPaid: {
      type: Boolean,
    },
    role: {
      type: String,
      enum: {
        values: AvailableUserTypes,
        message: "Please select a valid role",
      },
      default: UserTypeEnum.STUDENT,
    },
    bio: {
      type: String,
      maxLength: [200, "Bia cannot exceed 200 characters"],
    },
    enrolledCourses: [
      {
        course: {
          type: Schema.Types.ObjectId,
          ref: "Course",
        },
        enrolledAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdCourses: [
      {
        course: {
          type: Schema.Types.ObjectId,
          ref: "Course",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    refreshToken: {
      type: String,
      select: false,
    },
    verifyEmailToken: {
      type: String,
    },
    verifyEmailTokenExpiry: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpiry: {
      type: Date,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// pre hooks
// hashing the password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// methods
// compare or match the provided by the user
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = model.User || model("User", userSchema);
export default userModel;
