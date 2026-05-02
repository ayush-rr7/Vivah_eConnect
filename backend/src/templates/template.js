// /templates/emailTemplates.js

const templates = {
  OTP: (otp) => ({
    subject: "Your OTP Code",
    html: `<h2>Your OTP is ${otp}</h2>`
  }),

  NOTIFICATION: (message) => ({
    subject: "New Notification",
    html: `<p>${message}</p>`
  }),

  PROMOTION: () => ({
    subject: "Special Offer 🎉",
    html: `<h3>Upgrade to Premium now!</h3>`
  })
};

export default templates;