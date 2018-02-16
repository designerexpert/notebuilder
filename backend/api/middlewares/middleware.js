const knex = require('../../data/dbConfig.js');
const { secret } = require('../../config.js');
const jwt = require('jsonwebtoken');
const bc = require('bcrypt');
const sr = 11;

const hashPassword = (req, res, next) => {
    const pw = req.body.password
    bc.genSalt(sr, (err, salt) => {
        bc.hash(pw, salt, (err, hpw) => {
            req.body.password = hpw;
            next();
        })
    });
}

const changePassword = (req, res, next) => {
    const pw = req.body.newPassword
    bc.genSalt(sr, (err, salt) => {
        bc.hash(pw, salt, (err, hpw) => {
            req.body.newPassword = hpw;
            next();
        })
    });
}

const checkEmail = (req, res, next) => {
    const email = req.body.email;
    let regVar = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regVar.test(email)) {
        next();
    } else {
        res.json({ errorMessage: 'email pattern incorrect' })
    }
}

const authenticate = (req, res, next) => {
    const { email } = req.body;
    let pw = req.body.password;
    let hpw = ''
    knex('users').where({ email })
        .then(result => {
            console.log(result)
            // console.log(result)
            hpw = result[0].password;
            pw = req.body.password;
            console.log(pw)
            bc.compare(pw, hpw, (bcErr, bcResult) => {
                // console.log(bcResult);
                req.body.id = result[0].id;
                req.body.auth = bcResult;
                req.body.jwt = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), data: email }, secret); // Generate token for user
                next()
            })
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
}

const validateToken = (req, res, next) => {
    // this piece of middleware is taking the token delivered up to the server and verifying it
    // if no token is found in the header, you'll get a 422
    // if token is not valid, you'll be asked to login
    const token = req.headers.authorization;
    if (!token) {
        res
            .status(422)
            .json({ error: 'No authorization token found on Authorization header' });
    }
    jwt.verify(token, secret, (authError, decoded) => {
        if (authError) {
            res
                .status(403)
                .json({ error: 'Token invalid, please login', message: authError });
            return;
        }
        // sets the decoded JWT/user object on the request object for use in next middleware.
        req.decoded = decoded;
        next();
    });
};

module.exports = {
    hashPassword,
    authenticate,
    validateToken,
    changePassword,
    checkEmail,
}