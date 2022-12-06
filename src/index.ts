import express, { Request, Response } from "express";
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { connectDB } from "./Database";
dotenv.config();
import cors from "cors";
import models from "./models/index";
import Routes from "./routes/index";
import Socket from "./socket/socket";
import { sendMessageFun } from "./controllers/otp";
import { sendEmail } from "./functions/emailService";
import { sendMessage } from "./functions/sms";
// import fast2sms from 'fast-two-sms';

const app = express();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(morgan('dev'));
app.use(cors<Request>());

app.use('/user', Routes?.userRoutes);
app.use('/otp', Routes?.otpRouter);
app.use('/address', Routes?.addressRouter);
app.use('/serviceAreas', Routes?.serviceAreasRouter);
app.use('/blog', Routes?.blogRouter);
app.use('/category', Routes?.categoryRouter);
app.use('/order', Routes?.orderRouter);
app.use('/request', Routes?.requestRouter);
app.use('/subCategory', Routes?.subCategoryRouter);
app.use('/workHistory', Routes?.workHistoryRouter);

sendMessageFun

app.get('/', async (req: Request, res: Response) => {
    const name: string = 'rajbhayani.scaleteam@gmail.com';
    const obj: any = {
        name,
        otp: "7895",
    }
    // const data: any = sendEmail(name, 'Login', obj);
    sendMessage([9925185934], 1234);
    res.json({
        status: "Ok",
        // data
    })
});

connectDB().then(() => {
    console.log("Database connected successfully")
}).catch((error: any) => {
    console.log("Database Error index:--", error.message);
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})

Socket.connectSocketServer(server);

