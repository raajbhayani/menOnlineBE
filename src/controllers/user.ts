import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import models from '../models/index';
import { geneTokens } from "../functions/JwtToken";
import { sendResponse } from '../functions/sendResponse'


export const SignupUser = async (req: any, res: Response) => {

    const { userName, email, mobile } = req?.body;

    try {
        if (Object.keys(req?.body).length > 0) {

            await models?.User.findOne({ $and: [{ userName }, { email }, { mobile }] }).then(async (resp: any) => {
                if (resp) sendResponse(res, 200, { message: "User is exist" });
                else {
                    await models?.User.create(req?.body).then((result: any) => {
                        delete result?.password, result?.isDeleted, result?.isAdmin
                        sendResponse(res, 201, { data: result });
                    }).catch((error: any) => {
                        sendResponse(res, 401, { message: error?.message });
                    })
                }
            }).catch((error: any) => {
                sendResponse(res, 401, { message: error?.message });
            })

        } else {
            sendResponse(res, 204, { message: "Data is not available" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }
}

export const Login = async (req: any, res: Response) => {
    try {
        const { userName, email, mobile, password } = req?.body;
        if (Object.keys(req?.body).length > 0) {

            await models?.User.findOne({ $or: [{ userName: userName }, { email: email }, { mobile: mobile }], isDeleted: false }).then(async (result: any) => {
                if (result) {
                    const isValid = await bcrypt?.compare(password, result?.password);
                    if (isValid) {

                        const token = await geneTokens({ _id: result?._id.toString() });
                        delete result?._doc?.password;
                        delete result?._doc?.isDeleted;
                        delete result?._doc?.isAdmin;

                        sendResponse(res, 200, { data: result, token });
                    } else {
                        sendResponse(res, 400, { message: "Password is incorrect" });
                    }
                }
                else sendResponse(res, 401, { message: "User is not found" });

            }).catch((error: any) => {
            })

        } else {
            sendResponse(res, 400, { message: "Data is not available" });
        }
    } catch (error) {
        sendResponse(res, 400, { message: "Data is not available" });

    }
}

export const updateUser = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            await models?.User.findOneAndUpdate().then((result: any) => {

            }).catch((error: any) => {
                
            })

            // sendResponse(res, 200, { data: req?.user });
        }
        else {
            sendResponse(res, 400, { message: "Data is not available" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }
}

export const CheckApi = async (req: any, res: Response) => {
    try {
        sendResponse(res, 200, { data: req?.user });
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });

    }
}
