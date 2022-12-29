import { Request, Response } from "express";
import models from '../models/index';
import { sendResponse } from '../functions/sendResponse';
import { fileUpload } from "../functions/fileUpload"


export const addCategory = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { img, icon } = req?.body;

            // img && (req.body.img = await fileUpload(img));
            icon && (req.body.icon = await fileUpload(icon));

            await models?.Category.create(req?.body).then((result: any) => {
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

export const getCategory = async (req: any, res: Response) => {
    try {

        const { page, limit } = req?.params;

        await models?.Category.find({ isDelete: false }).sort({ index: 1 }).limit(limit * 1)
            .skip((page - 1) * limit).then((result: any) => {
                sendResponse(res, 200, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })

    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }
}

export const updateCategory = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id, img, icon, data } = req?.body;

            // img && (req.body.img = await fileUpload(img));
            icon && (req.body.icon = await fileUpload(icon));

            await models?.Category.findOneAndUpdate({ _id }, req?.body, { new: true }).then((result: any) => {
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

export const deleteCategory = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.body;

            await models?.Category.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true }).then((result: any) => {
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

export const categorySearch = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {
            const { search } = req?.body;
            const searchText = search.split(" ");
            const searchArray: any = [];

            for (let i in searchText) {
                searchArray.push({ name: { $regex: searchText[i], $options: 'i' }, description: { $regex: searchText[i], $options: 'i' } });
            }

            await models?.Category.find({ $and: searchArray }).then((result: any) => {
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