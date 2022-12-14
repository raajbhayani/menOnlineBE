import { Request, Response } from "express";
import { sendResponse } from '../functions/sendResponse';
import models from '../models/index';
import { geneTokens } from "../functions/JwtToken";
import { sendMessage } from "../functions/sms"
import { sendEmail } from "../functions/emailService";


export const sendMessageFun = async (mobile: number, messageFor: string) => {
    return new Promise(async (resolve, reject) => {
        await models?.User.findOne({ mobile, isDeleted: false }).then(async (userRes: any) => {
            if (!userRes) reject({ status: 401, data: "Unauthorized" });
            else {
                await models?.Otps.findOne({ userId: userRes?._id, mobile, isDeleted: false }).then(async (resResult: any) => {
                    if (resResult) {
                        resolve({ status: 200, data: true, resResult });
                    } else {
                        const otp = Math.floor(1000 + Math.random() * 9000);
                        await models?.Otps.create({ userId: userRes?._id, mobile, otp, messageFor }).then(async (result: any) => {
                            await sendMessage([mobile.toString()], otp)
                            resolve({ status: 200, data: true, result });
                        }).catch((error: any) => {
                            reject({ status: 400, message: error.message });
                        })
                    }
                }).catch((error: any) => reject({ status: 400, message: error.message }));
            }
        }).catch((error: any) => reject({ status: 400, message: error?.message }))
    })
}

export const createOtp = async (req: any, res: Response) => {
    try {
        const { mobile, email, messageFor } = req?.body;
        console.log("🚀 ~ file: otp.ts:35 ~ createOtp ~ req?.body", req?.body)
        await models?.User.findOne({ $or: [{ mobile }, { email }], isDeleted: false }).then(async (userRes: any) => {
            if (!userRes) sendResponse(res, 401, { data: "Unauthorized" });
            else {
                await models?.Otps.findOne({ userId: userRes?._id, $or: [{ mobile }, { email }], isDeleted: false }).then(async (resResult: any) => {
                    if (resResult) {
                        if (email) {
                            const obj: any = {
                                name: email,
                                otp: resResult?.otp,
                                propose: "Account verification code"
                            }
                            sendEmail(email, "Login", obj)
                        }
                        sendResponse(res, 200, { data: true });
                    } else {
                        const otp = Math.floor(1000 + Math.random() * 9000);
                        req.body.userId = userRes?._id;
                        req.body.otp = otp;
                        await models?.Otps.create(req.body).then(async (result: any) => {
                            if (email) {
                                const obj: any = {
                                    name: email,
                                    otp,
                                    propose: "Account verification code"
                                }
                                sendEmail(email, "Login", obj)
                            }
                            // await sendMessage(mobile, otp);
                            sendResponse(res, 200, { data: true });
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