import dotenv from "dotenv"
import nodemailer from "nodemailer"
dotenv.config()

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
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
      user: process.env.AUTH_USERNAME,
      pass: process.env.AUTH_PASSWORD
    }
  })
  transporter.sendMail(msg, (error, info) => {
    if (error) console.log(error)
    else console.log(info)
  })


};

export default sendEmail