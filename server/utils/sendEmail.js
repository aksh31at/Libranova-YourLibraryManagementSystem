import nodeMailer from 'nodemailer';
export const sendEmail = async ({email, subject, message}) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS,
        },
        tls: {
        rejectUnauthorized: false, // 🔥 This allows self-signed certs
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: message,
    };

    await transporter.sendMail(mailOptions);
}