"use strict"; // Acest lucru asigură că codul este interpretat în mod strict și aplică reguli suplimentare pentru a evita erorile comune

// Importăm modulele necesare
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express(); // Inițializăm o aplicație Express
const port = 5500; // Portul pe care va asculta serverul

app.use(cors()); // Middleware pentru gestionarea cererilor CORS

// Middleware pentru gestionarea datelor JSON
app.use(bodyParser.json());

// Endpoint pentru gestionarea trimiterea formularului
app.post("/sendEmail", (req, res) => {
  // Extragerea datelor din cererea primită
  const {
    lastname,
    name,
    phone,
    email,
    people,
    apartment,
    checkin,
    checkout,
    message,
  } = req.body;

  // Compunerea mesajului de e-mail
  const mailOptions = {
    from: "aurelia.mihoc@demomailtrap.com", // Adresa de la care se trimite e-mailul
    to: "mihoc.aura@gmail.com", // Adresa la care se trimite e-mailul
    subject: "Test Email", // Subiectul e-mailului
    html: `
            <p><strong>Last Name:</strong> ${lastname}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Number of People:</strong> ${people}</p>
            <p><strong>Apartment:</strong> ${apartment}</p>
            <p><strong>Check-in Date:</strong> ${checkin}</p>
            <p><strong>Check-out Date:</strong> ${checkout}</p>
            <p><strong>Message/Special Requests:</strong> ${message}</p>
        `,
  };

  // Crearea unui transporter pentru trimiterea e-mailului folosind nodemailer
  const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "5631ec043642161f4f9acf5f663b3624",
    },
  });

  // Trimiterea mesajului de e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error); // Afișăm eroarea în consolă
      res.status(500).send("Internal Server Error"); // Răspundem cu o eroare HTTP 500
    } else {
      console.log("Email sent:", info.response); // Afișăm mesajul trimis în consolă
      res.status(200).send("Email sent successfully"); // Răspundem cu un mesaj de succes HTTP 200
    }
  });
});

// Pornirea serverului și ascultarea pe portul specificat
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
