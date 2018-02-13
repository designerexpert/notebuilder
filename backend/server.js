const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./data/dbConfig');
const CORS = require('cors');
const server = express();
const port = process.env.PORT || 5000;


const routes = require('./api/routes/routes');

const corsOptions = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// const mongoose = require('mongoose');
// const dbUrl = 'mongodb://localhost/notebuilder';
// mongoose.Promise = global.Promise;
// mongoose.connect(dbUrl);

// Begin code for cross-site allowances -------------------------------------
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Cross Site Allowance
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
server.use(bodyParser.json());
server.use(CORS(corsOptions));
// End code for cross-site allowances -------------------------------------

routes(server);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});