const knex = require('../../data/dbConfig.js');
const { secret } = require('../../config.js');
const jwt = require('jsonwebtoken');

const users = (req, res) => {
    knex('users')
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        });
};

const userById = (req, res) => {
    const id = Number(req.params.id);
    knex('users').where({ id })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        });
};

const createUser = (req, res) => {
    const user = req.body;
    knex.insert(user)
        .into('users')
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(400).json({ errorMessage: 'unable to register user. Already registered? Try to log-in instead!' });
        });
}

const deleteUser = (req, res) => {
    const { id } = req.body;
    knex('users').where({ id })
        .del()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        });
}

const login = (req, res) => {
    const { id } = req.body;
    console.log(req.body)
    knex('users').where({ id })
        .then(result => {
            const { email, id, createdAt } = result[0];
            const { auth } = req.body;
            const token = jwt.sign({ data: email }, secret);
            let selectedResult = { id, email, auth, createdAt, token };
            if (!auth) { selectedResult = { errorMessage: 'User not Authenticated, Please log-in again!' } }
            res.json(selectedResult)
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        });
}

const updateUser = (req, res) => {
    const { newPassword, email, auth } = req.body;
    const newUser = { password: newPassword }
    console.log(auth);
    if (!auth) { res.json({ errorMessage: 'User not Authenticated, Please log-in again!' }) }
    knex('users').where({ email })
        .update(newUser)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        })
}

module.exports = {
    users,
    createUser,
    login,
    userById,
    deleteUser,
    updateUser,
}

// knex.schema.createTable('users', (tbl) => {
//     tbl.increments('id').primary().notNullable();
//     tbl.string('email', 255).notNullable();
//     tbl.string('password', 255).notNullable();
//     tbl.timestamp('createdAt').defaultTo(knex.fn.now());
// }),