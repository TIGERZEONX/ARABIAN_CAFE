const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

// Get All Users
router.get(
    "/",
    authenticate,
    authorize("SUPER_ADMIN"),
    userController.getAllUsers
);

// Get User By Id
router.get(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN"),
    userController.getUserById
);

// Create User
router.post(
    "/",
    authenticate,
    authorize("SUPER_ADMIN"),
    userController.createUser
);

// Update User
router.put(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN"),
    userController.updateUser
);

// Delete User
router.delete(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN"),
    userController.deleteUser
);

module.exports = router;