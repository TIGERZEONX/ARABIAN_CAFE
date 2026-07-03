const bcrypt = require("bcryptjs");

const Role = require("../models/Role");


const User = require("../models/User");

const { generateToken } = require("../utils/jwt");

// =========================
// Register
// =========================

const register = async (data) => {
    const { fullName, email, phone, password, role } = data;

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Auto-resolve a default role if none is provided in the request
    let roleId = role;
    if (!roleId) {
        let defaultRole = await Role.findOne({ name: "Super Admin" });
        if (!defaultRole) {
            defaultRole = await Role.create({
                name: "Super Admin",
                permissions: ["all"]
            });
        }
        roleId = defaultRole._id;
    }

    const user = await User.create({
        fullName,
        email,
        phone,
        password: hashedPassword,
        role: roleId
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
    console.log(password, user.password);

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );
    console.log("rrrrrrr", isMatch);

    if (!isMatch) {
        throw new Error("Invalid Password");
    }

    user.lastLogin = new Date();

    // Auto-resolve role for legacy accounts during login
    if (!user.role) {
        let defaultRole = await Role.findOne({ name: "Super Admin" });
        if (!defaultRole) {
            defaultRole = await Role.create({
                name: "Super Admin",
                permissions: ["all"]
            });
        }
        user.role = defaultRole._id;
    }

    await user.save({ validateBeforeSave: false });

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