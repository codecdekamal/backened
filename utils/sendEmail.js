const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig")
const sendEmail = async({to,subject,html})=>{
  const testAccout = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport(nodemailerConfig)
    const info = await transporter.sendMail({
     from: '"Kamal Joshi" <kamalkj9368@gmail.com>', // sender address
      to,
      subject,
      html,
      });
}
module.exports = sendEmail;