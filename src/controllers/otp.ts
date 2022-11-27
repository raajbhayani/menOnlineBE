import { Request, Response } from "express";
import { sendResponse } from '../functions/sendResponse';
import models from '../models/index';
import { geneTokens } from "../functions/JwtToken";

export const createOtp = async (req: any, res: Response) => {
    try {
        const { mobile, messageFor } = req?.body;
        console.log('🚀 ~ file: otp.ts ~ line 9 ~ createOtp ~  req?.body', req?.body);

        const otp = Math.floor(1000 + Math.random() * 9000);

        await models?.User.findOne({ mobile, isDeleted: false }).then(async (userRes: any) => {
            if (!userRes) sendResponse(res, 401, { data: "Unauthorized" });
            else {
                await models?.Otps.findOne({ userId: userRes?._id, mobile, isDeleted: false }).then(async (resResult: any) => {
                    if (resResult) {
                        sendResponse(res, 200, { data: true, resResult });
                    } else {
                        await models?.Otps.create({ userId: userRes?._id, mobile, otp, messageFor }).then((result: any) => {
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