import { Request, Response } from "express";
import models from '../models/index';
import { sendResponse } from '../functions/sendResponse';

export const addAddress = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.user;

            req.body.userId = _id;

            await models?.Address.create({ ...req?.body }).then((result: any) => {
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

export const getAddress = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.user;

            req.body.userId = _id;

            await models?.Address.find({ _id: req?.body?._id, userId: _id, isDeleted: false }).then((result: any) => {
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

export const upDateAddress = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.user;

            req.body.userId = _id;

            await models?.Address.findOneAndUpdate({ _id: req?.body?._id, userId: _id, isDeleted: false }, { ...req?.body }, { new: true }).then((result: any) => {
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

export const deleteAddress = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.user;

            req.body.userId = _id;

            await models?.Address.findOneAndUpdate({ _id: req?.body?._id, userId: _id, isDeleted: false }, { isDeleted: true }).then((result: any) => {
                sendResponse(res, 201, { message: "Address deleted successfully" });
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