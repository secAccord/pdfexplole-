const express = require('express');
const path = require('path');
const app = express();
app.use('/',express.static(path.join(__dirname,'../gui/public/login')));
app.use('/explor',express.static(path.join(__dirname,'../gui/public')));
module.exports = app;