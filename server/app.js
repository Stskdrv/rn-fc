//here we will describe all app
const express = require('express');
const authRoutes = require('./routes/auth');
const recordRoutes = require('./routes/record')
const app = express();

app.use('/api/auth', authRoutes);
app.use('/api/record', recordRoutes);

module.exports = app;