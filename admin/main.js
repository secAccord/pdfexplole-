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

app.get('/api/admin/pdf',(req,res)=>{
    const db = [];
    const categoryDB = JSON.parse(file.readFileSync('admin/db/category.json'))
    const pdfDB = JSON.parse(file.readFileSync('admin/db/pdf.json'))
    pdfDB.forEach(e => {
      
        db.push({
                name:e.name,
                src:e.src,
                category:categoryDB[e.ctg].name,
                catalog:categoryDB[e.ctg].catalogs[e.cata].name,
                author:e.author,
                data:e.addonData,
                info:e.info,

        })
    });
    res.header('Author','Dawid Zgoda')
    res.json(db)
})
/*app.get('/api/setup'),(req,res)=>{

    const data = file.readFileSync('admin/db/catalogs.json')
    const db = JSON.parse(data)



}*/
app.get('/api/admin/category',(req,res)=>{

    const data = file.readFileSync('admin/db/category.json')
    const db = JSON.parse(data)

    res.json(db)
})

app.use('/pdf',express.static(path.join(__dirname,'/pdfData')))
app.post('/api/uploadFile',controller.upload)
app.get('/api/getFile',controller.download)
module.exports = app;
