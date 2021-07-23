const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const session = require('express-session')
const cors = require('cors');

const usersRouter = require('./routes/users');
const courseRouter = require('./routes/courses');

const app = express();

app.use(cors());

mongoose.connect(
    "mongodb://localhost:27017/gslabuniversity",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    () => console.log('DB Connected!')
);

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', usersRouter);
app.use('/course', courseRouter);

module.exports = app;
