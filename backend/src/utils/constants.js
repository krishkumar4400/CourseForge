const UserTypeEnum = {
    STUDENT: "student",
    INSTRUCTOR: "instructor",
    ADMIN: "admin"
};

const AvailableUserTypes = Object.values(UserTypeEnum);

export {
    UserTypeEnum,
    AvailableUserTypes
};