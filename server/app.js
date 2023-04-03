//here we will describe all app
const express = require('express');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const recordRoutes = require('./routes/record');
const { MONGO_URI } = require('../config/keys');
const app = express();


mongoose.connect(MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch(e => console.log(e));

app.use(morgan('dev'));
app.use(require('cors')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/record', recordRoutes);

module.exports = app;  