const settingService = require("../services/setting.service");

const getSettings = async (req, res, next) => {
    try {
        const settings = await settingService.getSettings();
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        next(error);
    }
};

const updateSettings = async (req, res, next) => {
    try {
        const settings = await settingService.updateSettings(req.body);
        res.status(200).json({ success: true, message: "Settings updated successfully", data: settings });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSettings,
    updateSettings
};
