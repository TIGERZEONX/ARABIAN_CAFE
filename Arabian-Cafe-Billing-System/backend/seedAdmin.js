require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./src/models/User");
const Role = require("./src/models/Role");

async function seedAdmin() {
    try {

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ MongoDB Connected");

        let role = await Role.findOne({ name: "Super Admin" });

        if (!role) {
            role = await Role.create({
                name: "Super Admin"
            });

            console.log("✅ Admin Role Created");
        }

        const user = await User.findOne({
            email: "admin@arabiancafe.com"
        });

        if (user) {
            console.log("⚠ Admin Already Exists");
            return;
        }

        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        await User.create({
            fullName: "System Administrator",
            email: "admin@arabiancafe.com",
            phone: "9876543210",
            password: hashedPassword,
            role: role._id,
            isActive: true
        });

        console.log("✅ Admin User Created");

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

seedAdmin();