const { body } = require("express-validator");

exports.createUserValidation = [

    body("fullName")
        .notEmpty()
        .withMessage("Full Name is required"),

    body("email")
        .isEmail()
        .withMessage("Valid Email required"),

    body("phone")
        .notEmpty()
        .withMessage("Phone Number required"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password should be at least 6 characters")

];