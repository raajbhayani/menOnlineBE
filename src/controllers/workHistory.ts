import { Request, Response } from "express";
import models from '../models/index';
import { sendResponse } from '../functions/sendResponse';
import { fileUpload } from "../functions/fileUpload"


export const addBlog = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.user;

            req.body.userId = _id;

            req?.body?.image && (req.body.image = await fileUpload(req?.body?.image));

            await models?.Blog.create(req?.body).then((result: any) => {
                sendResponse(res, 201, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })
        } else {
            sendResponse(res, 400, { message: "Entre a required fields" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }

}

export const getBlog = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { page, limit } = req?.body;
            await models?.Blog.find().sort({ _id: -1 }).limit(limit * 1)
                .skip((page - 1) * limit).then((result: any) => {
                    sendResponse(res, 200, { data: result });
                }).catch((error: any) => {
                    sendResponse(res, 400, { message: error?.message });
                })
        } else {
            sendResponse(res, 400, { message: "Entre a required fields" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }
}

export const updateBlog = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id, image } = req?.body;

            image && (req.body.image = await fileUpload(image));

            await models?.Blog.findOneAndUpdate({ _id }, req?.body, { new: true }).then((result: any) => {
                sendResponse(res, 200, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })

        } else {
            sendResponse(res, 400, { message: "Entre a required fields" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }
}

export const deleteBlog = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.body;

            await models?.Blog.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true }).then((result: any) => {
                sendResponse(res, 200, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })

        } else {
            sendResponse(res, 400, { message: "Entre a required fields" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }
}