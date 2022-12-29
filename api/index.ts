import express, { Request, Response } from "express";
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { connectDB } from "../src/Database";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import models from "../src/models/index";
import Routes from "../src/routes/index";
import Socket from "../src/socket/socket";
import { sendEmail } from "../src/functions/emailService";
import { sendMessage } from "../src/functions/sms";

const app = express();
app.use(bodyParser.json());
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
app.use('/workHistory', Routes?.workHistoryRouter);

app.get('/', async (req: Request, res: Response) => {
    // const name: string = '';
    // const obj: any = {
    //     name,
    //     otp: "7895",
    //     propose: "Account verification code"
    // }
    // let data: any;
    // sendEmail(name, 'Login', obj).then((res: any) => data = res).catch((error: any) => data = error.message)

    res.json({
        status: "Ok",
        // data: data
    })
});

connectDB().then(() => {
    console.log("Database connected successfully")
}).catch((error: any) => {
    console.log("Database Error index:--", error.message);
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Men online app listening on port ${process.env.PORT}`)
})

Socket.connectSocketServer(server);