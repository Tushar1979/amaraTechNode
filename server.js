import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs"
import EmailSender from "./sendEmail.js";
import  fileupoad from 'express-fileupload';

// dotenv.config();
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit:"50mb"}));
// app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(fileupoad({useTempFiles:true}))

// ****** SEND API
let img;
app.post("/send", async (req, res) => {
  try {
    // const { firstName, lastName, companyName, email, phone, query, message} = req.body
    const reqData = req.body

  //   // let  = req.body.file.split(';base64,').pop();
   console.log(reqData, "final");
  //   const jsonString = fs.readFileSync(req.files.file.tempFilePath);
  
     
  
    // obj.fileContent = req.body.file ? req.body.file : "";
    let obj = undefined;
    if (req.body.file) {
      if(reqData.user_file){
        obj  = {filename:req.body.fileName,fileContent:req.body.file}
      }
      console.log("Here is done");
       obj  = {filename:req.body.fileName,fileContent:req.body.file}
    }
    // console.log(req.body.file);
    delete reqData.file;
    delete reqData.fileName;
    EmailSender(reqData,obj)
    res.json({ msg: "Your message sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Error ❌" });
  }
});


app.listen(5000, () => {
  console.log(`Server is connected`)
});
