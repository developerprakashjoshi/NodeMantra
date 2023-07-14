import nodemailer from 'nodemailer';

export  const Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ,
    port:  465,
    secure: true,
    auth: {
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASSWORD
    }
});