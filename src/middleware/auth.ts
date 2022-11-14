import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import model from "../models/index";
import { sendResponse } from '../functions/sendResponse';

export const authUsers = async (req: any, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = await req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'manOnline8080', async (error: any, decoded: any) => {
            if (decoded) {
                await model?.User.findOne({ _id: decoded?._id, $or: [{ role: "user" }, { role: "admin" }], isDeleted: false }).then((result: any) => {
                    if (result) {
                        req.userData = result;
                        next();
                    } else {
                        sendResponse(res, 401, { message: "Unauthorized" });
                    }
                })

            } else if (error) {
                sendResponse(res, 401, { message: error?.message });
                return res.json({
                    status: 401,
                    message: "invalid token!",
                });
            }
        });
    } else {
        return res.json({
            status: 401,
            message: "Unauthorized",
        });
    }
}

export const authAdmin = async (req: any, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = await req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'manOnline8080', async (err: any, decoded: any) => {
            if (decoded) {
                await model?.User.findOne({ _id: decoded?._id, isAdmin: true, role: 'admin', isDeleted: false }).then((result: any) => {
                    if (result) {
                        req.userData = result;
                        next();
                    } else {
                        sendResponse(res, 401, { message: "Unauthorized" });
                    }
                })
            } else if (err) {
                return res.json({
                    status: 401,
                    message: "invalid token!",
                });
            }
        });
    } else {
        return res.json({
            status: 401,
            message: "Unauthorized",
        });
    }
}

export const authLabour = async (req: any, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = await req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'manOnline8080', async (err: any, decoded: any) => {
            if (decoded) {
                await model?.User.findOne({ _id: decoded?._id, $or: [{ role: 'labour' }, { role: "admin" }], isDeleted: false }).then((result: any) => {
                    if (result) {
                        req.userData = result;
                        next();
                    } else {
                        sendResponse(res, 401, { message: "Unauthorized" });
                    }
                })
            } else if (err) {
                return res.json({
                    status: 401,
                    message: "invalid token!",
                });
            }
        });
    } else {
        return res.json({
            status: 401,
            message: "Unauthorized",
        });
    }
}

export const authContractor = async (req: any, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = await req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'manOnline8080', async (err: any, decoded: any) => {
            if (decoded) {
                await model?.User.findOne({ _id: decoded?._id, $or: [{ role: 'contractor' }, { role: "admin" }], isDeleted: false }).then((result: any) => {
                    if (result) {
                        req.userData = result;
                        next();
                    } else {
                        sendResponse(res, 401, { message: "Unauthorized" });
                    }
                })
            } else if (err) {
                return res.json({
                    status: 401,
                    message: "invalid token!",
                });
            }
        });
    } else {
        return res.json({
            status: 401,
            message: "Unauthorized",
        });
    }
}