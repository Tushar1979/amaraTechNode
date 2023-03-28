import nodemailer from 'nodemailer';

import * as dotenv from 'dotenv'
dotenv.config()

const Email = (options) => {
  let transpoter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });
  transpoter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(info)
    }
  });
};


const EmailSender = (user_info, file) => {

  let user_info_keys = []
  Object.entries(user_info).forEach(([keys, value]) => {
    user_info_keys.push(`<p>${keys} : <b>${value}</b></p>`)
  });
  console.log(user_info_keys, "user_info_keys");

  let options = {
    from: `"AmaraTech IT Solutions" < @gmail.com>`,
    to: `< @gmail.com>`,
    subject: 'Message From Contact Form',
    text: "Hello",
    html: `
    <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
    <div style="max-width: 700px; background-color: white; margin: 0 auto">
      <div style="width: 100%;   padding: 20px 0">
      <a><img
          src="https://media.amaratechit.com/wp-content/uploads/2022/10/Logo-1.png"
          style="width: 100%; height: 70px; object-fit: contain"
        /></a> 
      
      </div>
      <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
       
        <div style="font-size: .8rem; margin: 0 30px"> 
       ${user_info_keys.join('')}
        </div>
      </div>
    </div>
    </div>
    `,
  }

  if (file && !user_info?.user_file) {
    options["attachments"] = [{
      filename: file.filename,
      content: file.fileContent.split("base64,")[1],
      encoding: 'base64'
    }]
  }

  Email(options)
  if (user_info?.user_file) {
    // console.log("user_info?.user_file",user_info?.user_file);
    Email({
      from: `"AmaraTech IT Solutions" < @gmail.com>`,
      to: user_info?.Email,
      subject: 'Message From AmaraTech IT Solutions',
      attachments: [{
        filename: file.filename,
        content: file.fileContent.split("base64,")[1],
        encoding: 'base64'
      }]
    })
  }
};

export default EmailSender
