// import { Resend } from "resend";

import nodemailer from "nodemailer";

export  const sendEmail = async ({ to, subject, html }) => {
  try {
    const user = process.env.SMTP_EMAIL;
    const pass = process.env.SMTP_PASSWORD?.replace(/\s/g, "");

    if (!user || !pass) {
      throw new Error("SMTP_EMAIL and SMTP_PASSWORD are required");
    }
  console.log("at transporter");
    // Create transporter
    const transporter = nodemailer.createTransport({
         host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,
      auth: {
        user, // sender email
        pass, // Gmail App Password
      },
    });

    // Mail options
    const mailOptions = {
      from: `"Vivah e-Connect" <${user}>`,
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
