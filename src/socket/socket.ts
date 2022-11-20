import models from "../models/index";
import jwt from "jsonwebtoken";


export const connectSocketServer = async (server: any) => {

    const io = require("socket.io")(server, { cors: { origin: "*" } });

    io.use((socket: any, next: any) => {
        try {
            const token = socket.handshake.query.token;
            jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'manOnline8080', async (err: any, decoded: any) => {
                if (err) throw err.message;
                await models?.User.findOne({ _id: decoded?._id, isDeleted: false }).then((result: any) => {
                    if (result) {
                        socket.userId = result;
                        next();
                    } else {
                        io.sockets.to(socket.id).emit("auth", { message: "user not found" })
                    }
                }).catch((error: any) => {
                    io.sockets.to(socket.id).emit("auth", { message: "user not found" })
                })

            });
        } catch (error: any) {
            console.log(error.message);
        }
    });



}

export default { connectSocketServer }