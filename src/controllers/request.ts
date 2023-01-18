import { Request, Response } from "express";
import models from '../models/index';
import { sendResponse } from '../functions/sendResponse';

export const addRequest = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.me;

            req.body.by = _id;

            await models?.Request.create(req?.body).then((result: any) => {
                sendResponse(res, 201, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })
        } else {
            sendResponse(res, 400, { message: "Enter a required fields" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }

}

export const getRequest = async (req: any, res: Response) => {
    try {
        const { page, limit } = req?.params;
        const { _id } = req?.me;

        await models?.Request.find({ $or: [{ by: _id }, { to: _id }] }).populate(["categoryId", "addressId"]).sort({ _id: -1 }).limit(limit * 1)
            .skip((page - 1) * limit).then((result: any) => {
                sendResponse(res, 200, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })

    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }
}

export const updateRequest = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.body;

            await models?.Request.findOneAndUpdate({ _id }, req?.body, { new: true }).populate(["categoryId", "addressId"]).then((result: any) => {
                sendResponse(res, 200, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })

        } else {
            sendResponse(res, 400, { message: "Enter a required fields" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }
}

export const deleteRequest = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.body;

            await models?.Request.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true }).then((result: any) => {
                sendResponse(res, 200, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })

        } else {
            sendResponse(res, 400, { message: "Enter a required fields" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }
}