import { Request, Response } from "express";
import { sendResponse } from '../functions/sendResponse';
import models from '../models/index';
import { geneTokens } from "../functions/JwtToken";
import { sendMessage } from "../functions/sms"


export const createOtp = async (req: any, res: Response) => {
    try {
        const { mobile, messageFor } = req?.body;

        await models?.User.findOne({ mobile, isDeleted: false }).then(async (userRes: any) => {
            if (!userRes) sendResponse(res, 401, { data: "Unauthorized" });
            else {
                await models?.Otps.findOne({ userId: userRes?._id, mobile, isDeleted: false }).then(async (resResult: any) => {
                    if (resResult) {
                        sendResponse(res, 200, { data: true, resResult });
                    } else {
                        const otp = Math.floor(1000 + Math.random() * 9000);
                        await models?.Otps.create({ userId: userRes?._id, mobile, otp, messageFor }).then(async (result: any) => {
                            await sendMessage(mobile, otp);
                            sendResponse(res, 200, { data: true, result });
                        }).catch((error: any) => {
                            sendResponse(res, 400, { message: error.message });
                        })
                    }
                }).catch((error: any) => sendResponse(res, 400, { message: error.message }));
            }
        }).catch((error: any) => sendResponse(res, 400, { message: error?.message }))

    } catch (error: any) {
        sendResponse(res, 400, { message: error.message });
    }
}