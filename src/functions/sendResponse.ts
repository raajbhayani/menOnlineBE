import express, { Request, Response } from "express";

export const sendResponse = (res: Response, status: number, data: any) => {
    return res.status(status).json({
        ...data
    })
}