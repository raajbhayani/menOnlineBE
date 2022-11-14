import { Request, Response } from "express";
import { sendResponse } from '../functions/sendResponse';
import models from '../models/index';

export const addAppReviews = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {
            const { _id } = req?.user;

            await models.AppReview.create({ ...req?.body }).then((result: any) => {

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

export const updateAppReviews = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {
            const { _id } = req?.user;

            await models.AppReview.create({ _id: req?.body?._id, isDeleted: false }, { ...req?.body }, { new: true }).then((result: any) => {

                sendResponse(res, 200, { data: result });
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

