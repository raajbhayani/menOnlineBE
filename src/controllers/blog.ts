import { Request, Response } from "express";
import models from '../models/index';
import { sendResponse } from '../functions/sendResponse';
import { fileUpload } from "../functions/fileUpload"


export const addAddress = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.user;

            req.body.userId = _id;

            req?.body?.image && (req.body.image = await fileUpload(req?.body?.image));

            await models?.Blog.create({ ...req?.body }).then((result: any) => {
                sendResponse(res, 201, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })
        } else {
            sendResponse(res, 400, { message: "Data is not available" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }

}