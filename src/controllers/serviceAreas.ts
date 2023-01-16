import { Request, Response } from "express";
import models from '../models/index';
import { sendResponse } from '../functions/sendResponse';

export const addServiceAreas = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            // const { data } = req?.body;
            // let count: any = [];
            // for (let i in data) {
            //     count.push({
            //         name: data[i].city,
            //         isCity: true,
            //         district: data[i].city,
            //         state: data[i].state,
            //         country: 'India'
            //     })
            // }
            await models?.ServiceAreas.create(req?.body).then((result: any) => {
                sendResponse(res, 201, { data: result })
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })

            // await models?.ServiceAreas.insertMany(count).then((result: any) => sendResponse(res, 201, { data: true })).catch((error: any) => {
            //     sendResponse(res, 400, { message: error?.message });
            // });

        } else {
            sendResponse(res, 400, { message: "Enter a required fields" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }

}

export const getServiceAreas = async (req: any, res: Response) => {
    try {
        const { page, limit } = req?.params;

        await models?.ServiceAreas.find({ isDeleted: false }).limit(limit * 1)
            .skip((page - 1) * limit).then((result: any) => {
                sendResponse(res, 200, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })

    } catch (error: any) {
        console.log("🚀 ~ file: serviceAreas.ts ~ line 51 ~ getServiceAreas ~ error", error)
        sendResponse(res, 400, { message: error?.message });
    }
}

export const updateServiceAreas = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            await models?.ServiceAreas.findOneAndUpdate({ _id: req?.body }, req?.body, { new: true }).then((result: any) => {
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

export const deleteServiceAreas = async (req: any, res: Response) => {
    try {
        await models?.ServiceAreas.findOneAndUpdate({ _id: req?.body }, { isDeleted: true }).then((result: any) => {
            sendResponse(res, 200, { data: result });
        }).catch((error: any) => {
            sendResponse(res, 400, { message: error?.message });
        })

    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }
}

