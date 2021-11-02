const uploadFile = require("../upload/restric");
const fileJSON = require("fs")

const date = new Date();
const upload = async (req, res) => {
  try { 
   let errored = false;
    await uploadFile(req, res);
    
    if(req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    if(req.body.name == undefined){
      return res.status(400).send({message:"Please give name file "});
    }
    if(req.body.categ == undefined){
      return res.status(400).send({message:"Please give category "});
    }
    if(req.body.type == undefined){
      return res.status(400).send({message:"Please give type"});
    }

    
    const data = JSON.parse(fileJSON.readFileSync('admin/db/pdf.json'))
    data.forEach(e=>{
      if(e.src == req.file.originalname){
        errored = !errored
      }
      
    })
    if(!errored){
    data.push({
        name:req.body.name,
        src:`${req.file.originalname}`,
        addonData:`${date.getDay()+1}.${date.getMonth()+1}.${date.getFullYear()}`,
        categ:req.body.categ,
        type:req.body.type,
        author:req.body.author,

    })
    fileJSON.writeFileSync('admin/db/pdf.json',JSON.stringify(data))


    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  }else{
    res.status(401).send({
      message: "File exist " + req.file.originalname,
    });
  }
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file:${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = "admin/pdfData";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = "admin/pdfData/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};