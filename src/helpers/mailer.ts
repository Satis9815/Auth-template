import nodemailer from "nodemailer";

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOptions = {
            from: '"satiskumarchaudhary52@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: "<b>Hello world?</b>", 
          }
          const mailResponse = await transporter.sendMail(mailOptions);
          return mailResponse;
        
    } catch (error) {

        console.log("Something went wrong while sending mail")
        
    }

};
