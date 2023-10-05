// importamos nodemailer // CONFIGURACION DEL TRANSPORTADOR
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // => servidor de correos electronicos a utilizar
    port: 465,
    secure: true,
    auth: {
        user: process.env.G_USER,
        pass: process.env.G_PASSWORD
    }
});

module.exports = transporter;