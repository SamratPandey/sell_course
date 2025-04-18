const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
    const  adminToken = req.cookies.adminToken;
    if (!adminToken) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try {
        const decoded = jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET);
        console.log(decoded);
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        req.adminId = decoded.id;
        next();
    } catch (e) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}
