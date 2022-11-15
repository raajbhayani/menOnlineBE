import { Request, Response } from "express";
import models from '../models/index';
import { sendResponse } from '../functions/sendResponse';
import { fileUpload } from "../functions/fileUpload"


export const addOrder = async (req: any, res: Response) => {
    try {
        const { to, categoryId, status, paymentMethod } = req?.body
        if (Object.keys(req?.body).length > 0 && to && categoryId && status) {

            const com = async () => {
                req.body.by = _id;

                req?.body?.image && (req.body.image = await fileUpload(req?.body?.image));

                await models?.Order.create(req?.body).then((result: any) => {
                    sendResponse(res, 201, { data: result });
                }).catch((error: any) => {
                    sendResponse(res, 400, { message: error?.message });
                })
            }

            const { _id } = req?.user;

            if (status == "complete" && paymentMethod) com();
            else if (status == "progress") com();
            else sendResponse(res, 400, { message: "Entre a required fields" });

        } else {
            sendResponse(res, 400, { message: "Entre a required fields" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }

}

export const getOrder = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {
            const { _id, isAdmin } = req?.user;
            const { page, limit } = req?.body;

            let filter: any = {};
            !isAdmin && (filter = { $or: [{ by: _id }, { to: _id }] })

            await models?.Order.find(filter).sort({ _id: -1 }).limit(limit * 1)
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

export const updateOrder = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id, image } = req?.body;

            image && (req.body.image = await fileUpload(image));

            await models?.Order.findOneAndUpdate({ _id }, req?.body, { new: true }).then((result: any) => {
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

export const deleteOrder = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.body;

            await models?.Order.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true }).then((result: any) => {
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