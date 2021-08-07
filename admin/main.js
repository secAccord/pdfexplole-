const express = require('express');
const path = require('path');
const app = express();
const controller = require('../upload/controller')
const file = require('fs')



app.get('/api/admin/users', (req,res)=>{

    const data = file.readFileSync(`admin/db/users.json`);
    const db = JSON.parse(data)

    
    res.json(db)

})

app.get('/api/admin/ctg',(req,res)=>{

    const data = file.readFileSync('admin/db/category.json')
    const db = JSON.parse(data)

    res.json(db)
})
app.use('/pdf',express.static(path.join(__dirname,'/pdfData')))
app.post('/api/uploadFile',controller.upload)
module.exports = app;
