// import { Resend } from "resend";

import nodemailer from "nodemailer";

export  const sendEmail = async ({ to, subject, html }) => {
  try {

    console.log(process.env.SMTP_EMAIL);
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL, // sender email
        pass: process.env.SMTP_PASSWORD, // Gmail App Password
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to,
      subject,
      html,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw error;
  }
};

// export default sendEmail;


// // const resend = new Resend(process.env.RESEND_API_KEY);
// const resend = new Resend("re_g1SrqfvE_Pk1WpQfiFap3Tqn7NaJsAACG");


// export const sendEmail = async (to, subject, html) => {
//   try {
//     await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to,
//       subject,
//       html,
//     });
//   } catch (error) {
//     console.error("Email error:", error);
//     throw error;
//   }
// };
