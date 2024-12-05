const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Added to parse JSON payloads


    let OTP = Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP route
app.post('/text', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send("Email is required.");
    }

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
        host: process.env.Email_Host ,
        port: process.env.Email_Port ,
        secure: true,
        auth: {
            user: process.env.Send_Email,
            pass: process.env.Email_Pass, // Replace with your App Password
        },
    });

    const mailOptions = {
        from:process.env.Send_Email ,
        to: email,
        subject: 'Send Text Message',
        text: `Welcome!`,
        html: `<h4>${OTP}</h4>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).send("Failed to send text.");
        }
        console.log('Email sent: ' + info.response);
        res.send("Text sent successfully!");
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running at http://127.0.0.1:3000");
});
