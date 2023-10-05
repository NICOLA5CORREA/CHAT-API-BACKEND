const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if(!authorization) {
            throw {
                status: 401,
                message: 'No authorization header',
        };
        }
        const token = authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ' HS512',
        });

        req.user = user;
        next();
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = authenticate;