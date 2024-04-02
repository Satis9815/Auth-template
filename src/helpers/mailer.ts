import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
        const hashToken =await bcrypt.hash(userId.toString(),10);
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken:hashToken,verifyTokenExpiry:Date.now() + 3600000})
        }
        else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashToken,forgotPasswordTokenExpiry:Date.now() + 3600000})

        }
        const transporter  = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASSWORD
            }
          })

          const mailOptions = {
            from: 'satiskumarchaudhary52@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `<p>Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"} or copy and paste the link below in your browser <br/> ${process.env.DOMAIN}/verifyemail?token=${hashToken} </p>`, 
          }
          const mailResponse = await transporter.sendMail(mailOptions);
          return mailResponse;
        
    } catch (error) {

        console.log("Something went wrong while sending mail")
        
    }

};
