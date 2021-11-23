const express = require('express');
const path = require('path');
const app = express();
app.use('/',express.static(path.join(__dirname,'../gui/login')));
app.use('/eksploruj',express.static(path.join(__dirname,'../gui/public')));
app.use('/menu',express.static(path.join(__dirname,'../gui/menu')));
app.use('/addons',express.static(path.join(__dirname,'../gui/add')));
module.exports = app;