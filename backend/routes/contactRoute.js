import express from "express";
import nodemailer from "nodemailer";

const contactRouter = express.Router();

contactRouter.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'shoplio.destek@gmail.com',
        pass: 'shoplio123',
      },
    });
  
    const mailOptions = {
      from: email,
      to: 'shoplio.destek@gmail.com',
      subject: `Support Request from ${name}`,
      text: message,
    };
  
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email: ", error.message); // Hata mesajını yazdır
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
  
});

export default contactRouter;
