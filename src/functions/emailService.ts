import nodemailer from 'nodemailer';

export const sendEmail = async (to: any, subject: string, content: string) => {

    const transporter = await nodemailer.createTransport({
        // host: String(process.env.EMAIL_HOST),
        // port: Number(process.env.EMAIL_PORT),
        service: "gmail",
        auth: {
            // user: process.env.EMAIL_USERNAME,
            user: "rajbhayani4@gmail.com",
            pass: "qourkmnwcklnznuo"
            // pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to,
        subject: subject,
        text: content
    };

    await transporter.sendMail(mailOptions);

}