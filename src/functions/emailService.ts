import nodemailer from 'nodemailer';
import ejs from "ejs";
import path from "path";

export const sendEmail = async (user: any, emailFlag: string, obj: any) => {

    const transporter = await nodemailer.createTransport({
        // host: String(process.env.EMAIL_HOST),
        // port: Number(process.env.EMAIL_PORT),
        service: "gmail",
        auth: {
            // user: process.env.EMAIL_USERNAME,
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
            // pass: process.env.EMAIL_PASSWORD
        }
    });
    interface emailInter {
        from: any
        to: string
        subject: string
        test: string
        html: string
    }
    const mailOptions: any = {
        from: process.env.EMAIL_USERNAME,
        to: user,
        // subject: "subject",
        // text: "content"
    };

    if (emailFlag == "Login") {
        const { name, otp } = obj;
        const propose: any = "Account Login code"
        ejs.renderFile(path.join(__dirname, "../views") + "/otp.ejs",
            { name, otp, propose },
            (err, data) => {
                if (err) console.log("Error :", err);
                mailOptions["subject"] = "Email Verification";
                mailOptions["html"] = data;
            }
        )
    }

    if (emailFlag == "Verification") {
        const { name, otp } = obj;
        const propose: any = "Account verification code"
        ejs.renderFile(path.join(__dirname, "../views") + "/otp.ejs",
            { name, otp, propose },
            (err, data) => {
                if (err) console.log("Error :", err);
                mailOptions["subject"] = "Email Verification";
                mailOptions["html"] = data;
            }
        )
    }

    const nodeMailerRes: any = await transporter.sendMail(mailOptions);

    if (nodeMailerRes) {
        return {
            flag: true,
            message: nodeMailerRes.response
        }
    }
    return { flag: false }

}