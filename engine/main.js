const express = require('express')
const admin = require('../admin/main')
const user = require('../user/main')
const path = require('path')
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(admin)
app.use(user)
module.exports = app;
