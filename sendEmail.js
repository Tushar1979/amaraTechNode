import nodemailer from 'nodemailer';

const Email = (options) => {
  let transpoter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // user: process.env.EMAIL_USER,
      // pass: process.env.EMAIL_PASS,
      user: 'tsharma13791@gmail.com',
      pass: 'sjzxylltqokcdzxu',
    },
    tls: {
      ciphers:'SSLv3'
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


const EmailSender = ( props ) => {
  var key = []
  const onjectValues =  Object.entries(props).forEach(([keys, value]) => {
    key.push( `<p>${keys} : <b>${value}</b></p>`)
  });

  console.log(key, "key");

  const options = {
    from: `"AmaraTech IT Solutions" <tsharma13791@gmail.com>`,
    to: 'tsharma13791@gmail.com',
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
       ${key.join('')}
        </div>
      </div>
    </div>
    </div>
    `,
  };

  Email(options)
};

export default EmailSender
