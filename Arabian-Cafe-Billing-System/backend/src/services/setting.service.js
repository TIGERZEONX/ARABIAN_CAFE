const Tax = require("../models/Tax");

// ================================
// Get Config Settings
// ================================
const getSettings = async () => {
    let settings = await Tax.findOne();
    if (!settings) {
        // Create initial default settings if empty
        settings = await Tax.create({
            cafeName: "Arabian Cafe",
            address: "Arabian Cafe Street, India",
            phone: "+91 1234567890",
            gstNumber: "29AAAAA1111A1Z1",
            cgstRate: 2.5,
            sgstRate: 2.5,
            serviceChargeRate: 0,
            receiptHeader: "Welcome to Arabian Cafe",
            receiptFooter: "Thank you for dining with us!"
        });
    }
    return settings;
};

// ================================
// Update Config Settings
// ================================
const updateSettings = async (data) => {
    let settings = await Tax.findOne();
    if (!settings) {
        return await Tax.create(data);
    }

    // Update settings in database
    return await Tax.findByIdAndUpdate(settings._id, data, { new: true });
};

module.exports = {
    getSettings,
    updateSettings
};
