const JWT = require('jsonwebtoken')

const getToken = (user) => {
    return JWT.sign(
        {
            _id: user._id,
            email: user.email,
            user_profil: user.user_profil,
            security: user.security,
            admin: user.admin
        },
            process.env.JWT_SECRET,
        {
            expiresIn: '168h',
        }
    );
};

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const onlyToken = token.slice(7, token.length);
        JWT.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ message: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return;
        });
    } else {
        return res.status(401).send({ message: 'Token is not supplied.' });
    }
};

const ifUserAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        JWT.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ message: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return;
        });
    } else {
        req.user = null;
        next();
        return;
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.access.admin) {
        return next();
    }
    return res.status(401).send({ message: 'Admin Token is not valid.' });
};

module.exports = { getToken, isAuth, ifUserAuth, isAdmin };