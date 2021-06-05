const express = require('express');
const path = require('path');
const app = express();
app.use('/login',express.static(path.join(__dirname,'../gui/public/login')));

module.exports = app;