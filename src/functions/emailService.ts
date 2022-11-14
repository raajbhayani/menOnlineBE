import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, content: string) => {

    const transporter = await nodemailer.createTransport({
        host: String(process.env.EMAIL_HOST),
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: "rajbhayani.scaleteam@gmail.com",
        subject: subject,
        text: content
    };

    await transporter.sendMail(mailOptions);

}