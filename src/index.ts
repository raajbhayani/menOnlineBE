import express, { Request, Response } from "express";
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { connectDB } from "./Database";
dotenv.config();
import cors from "cors";
import models from "./models/index";
import Routes from "./routes/index";
import Socket from "./socket/socket";
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

app.get('/', async (req: Request, res: Response) => {
    const users = await models.User.find()
    res.json({
        users
    });
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

