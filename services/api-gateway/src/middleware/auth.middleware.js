const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({
            error: 'Access denied',
            message: 'No token provided'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Access denied',
            message: 'Invalid format. Use: Bearer <token>'
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            error: 'Invalid token',
            message: error.message
        });

    }
};


/* Roles */

const requireRole = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                error: 'Not Authenticated'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Forbidden',
                message: `Required: ${roles.join(' or ')}. You have: ${req.user.role}`
            });
        }

        next();
    };

};

module.exports = { verifyToken, requireRole };