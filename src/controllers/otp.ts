import { Request, Response } from "express";
import { sendResponse } from '../functions/sendResponse';
import models from '../models/index';
import { geneTokens } from "../functions/JwtToken";

export const createOtp = async (req: any, res: Response) => {
    try {
        const { _id, mobile, for } = req?.body;

        const userId: any = _id;
        const otp = Math.floor(1000 + Math.random() * 9000);

        await models?.User.findOne({ mobile, isDeleted: false }).then(async (userRes: any) => {
            if (userRes) sendResponse(res, 401, { data: "Unauthorized" });
            else {
                await models?.Otps.findOne({ userId, isDeleted: false }).then(async (resResult: any) => {
                    if (resResult) {
                        sendResponse(res, 200, { data: true, resResult });
                    } else {
                        await models?.Otps.create({ userId, mobile, otp, for }).then((result: any) => {
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