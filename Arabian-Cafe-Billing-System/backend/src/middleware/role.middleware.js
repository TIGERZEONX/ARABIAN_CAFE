const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({
                success: false,
                message: "Access Forbidden. Role missing."
            });
        }

        // Convert db role name "Super Admin" to standard UPPERCASE "SUPER_ADMIN"
        const userRoleName = req.user.role.name.toUpperCase().replace(/\s+/g, "_");

        if (!roles.includes(userRoleName)) {
            return res.status(403).json({
                success: false,
                message: "Access Forbidden"
            });
        }

        next();
    };
};

module.exports = authorize;
