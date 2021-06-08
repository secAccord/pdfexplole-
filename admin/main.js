const express = require('express');
const path = require('path');
const app = express();

app.use('/admin',express.static(path.join(__dirname,'../gui/admin')));

app.use('/admin/login',express.static(path.join(__dirname,'../gui/admin/login')))
app.get('/api/admin/users', (req,res)=>{
    const file = require('fs')
    file.readFile(`admin/db/users.json`,'utf-8',(err,data)=>{
        
        if(err){
            console.log(err)
        }else{
            data = JSON.parse(data);
            res.send(data)
        }
    })

})

module.exports = app;