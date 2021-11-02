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
    const catalogsDB = JSON.parse(file.readFileSync('admin/db/catalogs.json'))
    const pdfDB = JSON.parse(file.readFileSync('admin/db/pdf.json'))

    pdfDB.forEach(e => {
        const catalogs = catalogsDB[parseInt(e.categ[2] + e.categ[3])]
        const category = categoryDB[parseInt(e.categ[0] + e.categ[1])]
        db.push({
                name:e.name,
                src:e.src,
                category:category,
                catalog:catalogs,
                author:e.author,
                data:e.addonData

        })
    });
    res.header('Author','Dawid Zgoda')
    res.json(db)
})
/*app.get('/api/setup'),(req,res)=>{

    const data = file.readFileSync('admin/db/catalogs.json')
    const db = JSON.parse(data)



}*/
app.get('/api/admin/type',(req,res)=>{

    const data = file.readFileSync('admin/db/catalogs.json')
    const db = JSON.parse(data)

    res.json(db)
})
app.get('/api/admin/ctg',(req,res)=>{

    const data = file.readFileSync('admin/db/pdf.json')
    const db = JSON.parse(data)

    res.json(db)
})
app.use('/pdf',express.static(path.join(__dirname,'/pdfData')))
app.post('/api/uploadFile',controller.upload)
app.get('/api/getFile',controller.download)
module.exports = app;
