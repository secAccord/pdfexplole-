const express = require('express');
const path = require('path');
const app = express();
const file = require('fs')



app.get('/api/admin/users', (req,res)=>{

    const data = file.readFileSync(`admin/db/users.json`);
    const db = JSON.parse(data)

    
    res.json(db)

})

app.use('/pdf',express.static(path.join(__dirname,'/pdfData')))
module.exports = app;
