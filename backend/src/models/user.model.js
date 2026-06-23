import mongoose, { model, models, Schema } from "mongoose";
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
      trim: true,
      required: [true, "Name is required"],
      maxLength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
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
      maxLength: [128, "Password too long"],
      select: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
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
      trim: true,
      maxLength: [200, "Bio cannot exceed 200 characters"],
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
    isEmailVerified: {
      type: Boolean,
      default: false,
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
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
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

// pre hooks
// hashing the password
userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    console.error(error);
    throw new Error("Error occured while hashing the password");
  }
});

// methods
// compare or match the password provided by the user
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateTemporaryTokens = function () {
  const unHashedToken = crypto.randomBytes(30).toString("base64");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("base64");
  const expiryTime = Date.now() + 20 * 60 * 1000; // 20 Minutes

  return {
    unHashedToken,
    hashedToken,
    expiryTime,
  };
};

userSchema.methods.updateLastActive = function () {
  this.lastActive = Date.now();
  return this.lastActive({ validateBeforeSave: false });
};

// virtual field for enrolled courses
userSchema.virtual("totalEnrolledCourses").get(function () {
  return this.enrolledCourses?.length || 0;
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.refreshToken;
    delete ret.resetPasswordToken;
    delete ret.verifyEmailToken;
    return ret;
  },
});

userSchema.index({ email: 1 });

const userModel = models.User || model("User", userSchema);
export default userModel;
