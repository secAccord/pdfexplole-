const express = require('express')
const admin = require('../admin/main')
const path = require('path')
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(admin)
module.exports = app;
