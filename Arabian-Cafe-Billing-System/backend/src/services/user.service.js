const bcrypt = require("bcryptjs");

const User = require("../models/User");

const getAllUsers = async () => {
    return await User.find().select("-password");
};

const getUserById = async (id) => {
    return await User.findById(id).select("-password");
};

const createUser = async (data) => {

    data.password = await bcrypt.hash(data.password, 10);

    return await User.create(data);
};

const updateUser = async (id, data) => {

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    return await User.findByIdAndUpdate(
        id,
        data,
        {
            new: true
        }
    ).select("-password");
};

const deleteUser = async (id) => {

    return await User.findByIdAndDelete(id);

};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};