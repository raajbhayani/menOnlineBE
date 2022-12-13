import express, { Request, Response } from "express";

export const sendResponse = (res: Response, statusCode: number, data: any) => {
    return res.status(statusCode).json(data);
}