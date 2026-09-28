const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // Check whether the Authorization header contains a Bearer token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract the token from the Authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using the JWT secret key
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'secretkey123'
            );

            // Store the decoded user information in the request
            req.user = decoded;

            // Allow the request to continue
            next();

        } catch (error) {
            // Return an error if the token is invalid
            return res.status(401).json({
                message: 'Not authorized, token failed'
            });
        }
    }

    // Return an error if no token is provided
    if (!token) {
        return res.status(401).json({
            message: 'Not authorized, no token provided'
        });
    }
};

module.exports = { protect };