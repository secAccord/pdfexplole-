const express = require('express');
const path = require('path');
const app = express();
const file = require('fs')



//app.use('/admin/login',express.static(path.join(__dirname,'../gui/admin/login')))
app.get('/api/admin/users', (req,res)=>{

    const data = file.readFileSync(`admin/db/users.json`);
    const db = JSON.parse(data)

    
    res.json(db)

})
module.exports = app;
