import express, { Request, Response } from "express";
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { connectDB } from "./Database";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import models from "./models/index";
import Routes from "./routes/index";
import Socket from "./socket/socket";
import { sendEmail } from "./functions/emailService";
import { sendMessage } from "./functions/sms";

const app = express();
app.use(bodyParser.json());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(morgan('dev'));
app.use("/", express.static(process.env.ASSETS_STORAGE || ''));
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
    await models?.User.updateMany({isDeleted: false},{ socketId: []})
    res.json({
        status: "Ok"
    })
});

connectDB().then(() => {
    const server = app.listen(process.env.PORT, () => {
        console.log(`Server start on http://localhost:${process.env.PORT}`)
    })
    Socket.connectSocketServer(server);
}).catch((error: any) => {
    console.log("Database Error index:--", error.message);
})

