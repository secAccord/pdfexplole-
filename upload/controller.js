const uploadFile = require("../upload/restric");
const fileJSON = require("fs")

const date = new Date();
const upload = async (req, res) => {
  try { 
   
    await uploadFile(req, res);
    
    if(req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    if(req.body.name == undefined){
      return res.status(400).send({message:"Please give name file "});
    }
    
    const data = JSON.parse(fileJSON.readFileSync('admin/db/pdf.json'))
    data.push({
        name:req.name,
        src:`${req.file.originalname}`,
        addonData:`${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`,
        categ:"",
        type:"",

    })
    fileJSON.writeFileSync('admin/db/pdf.json',JSON.stringify(data))


    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
   
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
  const directoryPath = "admin/pdfData";

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