const UserTypeEnum = {
  STUDENT: "student",
  INSTRUCTOR: "instructor",
  ADMIN: "admin",
};

const AvailableUserTypes = Object.values(UserTypeEnum);

const CourseLevelEnum = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
};

const AvailableCourseLevels = Object.values(CourseLevelEnum);

export {
  UserTypeEnum,
  AvailableUserTypes,
  CourseLevelEnum,
  AvailableCourseLevels,
};
