const bcrypt = require("bcryptjs");

const User = require("../models/User");

const { generateToken } = require("../utils/jwt");

// =========================
// Register
// =========================

const register = async (data) => {

    const { fullName, email, phone, password, role } = data;

    const userExists = await User.findOne({
        email
    });

    if (userExists) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        email,
        phone,
        password: hashedPassword,
        role
    });

    const token = generateToken(user);

    return {
        success: true,
        message: "User Registered Successfully",
        token,
        user
    };
};

// =========================
// Login
// =========================

const login = async (data) => {

    const { email, password } = data;

    const user = await User.findOne({
        email
    });

    if (!user) {
        throw new Error("Invalid Email");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new Error("Invalid Password");
    }

    user.lastLogin = new Date();

    await user.save();

    const token = generateToken(user);

    return {
        success: true,
        message: "Login Successful",
        token,
        user
    };
};

module.exports = {
    register,
    login
};