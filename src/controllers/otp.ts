import { Request, Response } from "express";
import { sendResponse } from '../functions/sendResponse';
import models from '../models/index';

export const createOtp = async (req: any, res: Response) => {
    try {
        console.log("Start");
        const { _id, mobile } = req?.me;

        const userId: any = _id;
        const otp = Math.floor(1000 + Math.random() * 9000);

        await models?.Otps.create({ userId, mobile, otp, for: req?.body?.for }).then((result: any) => {
            sendResponse(res, 200, { data: true, result });
        }).catch((error: any) => {
            sendResponse(res, 400, { message: error.message });
        })

    } catch (error: any) {
        sendResponse(res, 400, { message: error.message });
    }
}