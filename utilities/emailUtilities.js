require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = (to, subject, text) => {
  const msg = {
    name: "Between Shows",
    from: process.env.AUTH_USERNAME,
    to: to,
    subject: subject,
    html: "<div><p>" + text + "</p></div>"
  };


    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        secure:true,
        auth : {
            user: process.env.AUTH_USERNAME,
            pass: process.env.AUTH_PASSWORD
        }
    })
    transporter.sendMail(msg, (error, info) =>{
        if(error) console.log(error)
        else console.log(info)
    })


};

module.exports = sendEmail;