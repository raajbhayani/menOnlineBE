import models from "../models/index";
import jwt from "jsonwebtoken";


export const connectSocketServer = async (server: any) => {

    const io = require("socket.io")(server, { cors: { origin: "*" } });

    io.use((socket: any, next: any) => {
        try {
            let token: any = socket?.handshake?.auth?.token;
            // let token: any = socket?.handshake?.header?.token)

            jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'manOnline8080', async (err: any, decoded: any) => {
                if (err) console.log("error", err.message);
                await models?.User.findOne({ _id: decoded?._id, isDeleted: false }).then((result: any) => {
                    if (result) {
                        socket.me = result;
                        next();
                    } else {
                        console.log("User is not found")
                    }
                }).catch((error: any) => {
                    console.log("User is not found")
                })
            });
        } catch (error: any) {
            console.log(error.message);
        }
    });

    io.on("connection", async (socket: any) => {
        const { _id, fullName }: any = socket?.me;
        console.log(`🚀 ~ Connected : ${socket?.me?.email}--${socket?.id}`);
        await models?.User.findOneAndUpdate({ _id }, { $push: { socketId: socket?.id } }, { new: true }).then((result) => {
            socket.me = result;
        })

        socket.on('createRequest', async (data: any) => {
            data.by = _id;
            await models?.Request.create(data).then(async (result: any) => {
                await models?.Request.findOne({ _id: result?._id }).populate(["categoryId", "addressId", "by", "to"]).then((res: any) => {
                    io.sockets.to([...res?.by?.socketId, ...res?.to?.socketId]).emit('resendRequest', { status: true, data: res });
                })
            }).catch((error: any) => {
                socket.emit('resendRequest', { status: false, message: error?.message })
            })
        })

        socket.on('requestTrue', async (data: any) => {
            const requestId = data?._id;
            delete data?._id;
            await models?.Order.create(data).then(async (result: any) => {
                await models?.Request.findOneAndUpdate({ _id: requestId }, { status: "success", isDeleted: true }, { new: true })
                    .populate(["categoryId", "addressId", "by", "to"]).then((res: any) => {
                        io.sockets.to([...res?.by?.socketId, ...res?.to?.socketId]).emit('sendrequestTrue', { status: true, data: res });
                    }).catch((error: any) => {
                        socket.emit("sendrequestTrue", { status: false, message: error.message });
                    });
            }).catch((error: any) => {
                socket.emit("sendrequestTrue", { status: false, message: error.message });
            });
        });

        socket.on("requestFalse", async (data: any) => {
            await models?.Request.findOneAndUpdate({ _id: data?._id }, data, { new: true })
                .populate(["categoryId", "addressId", "by", "to"]).then((res: any) => {
                    io.sockets.to([...res?.by?.socketId, ...res?.to?.socketId]).emit('sendRequestFalse', { status: true, data: res });
                }).catch((error: any) => {
                    socket.emit("sendRequestFalse", { status: false, message: error.message });
                })
        })

        socket.on("orderTrue", async (data: any) => {
            console.log('🚀 ~ file: socket.ts:75 ~ socket.on ~ data', data);
            let Obj: any = {}
            const userData = await models?.Order.findOne({ _id: data?._id });
            console.log('🚀 ~ file: socket.ts:78 ~ socket.on ~ userData', userData);
            userData?.by == data?.userId && (Obj.byIsConformed = true);
            userData?.to == data?.userId && (Obj.toIsConformed = true);
            console.log('🚀 ~ file: socket.ts:80 ~ awaitmodels?.Order.findOneAndUpdate ~ Obj', Obj);
            await models?.Order.findOneAndUpdate({ _id: data?._id }, Obj, { new: true }).then(async (res: any) => {
                if (res?.byIsConformed && res?.toIsConformed) {
                    await models?.Order.findOneAndUpdate({ _id: res?._id }, { status: "complete" }, { new: true }).populate(["categoryId", "addressId", "by", "to"]).then((result: any) => {
                        io.sockets.to([...result?.by?.socketId, ...result?.to?.socketId]).emit('sendOrderTrue', { status: true, data: res });
                    }).catch((error: any) => {
                        socket.emit("sendOrderTrue", { status: false, message: error.message });
                    })
                }
            }).catch((error: any) => {
                socket.emit("sendOrderTrue", { status: false, message: error.message });
            })
        })
        socket.on("orderFalse", async (data: any) => {
            await models?.Order.findOneAndUpdate({ _id: data?._id }, { isDeleted: true }, { new: true }).populate(["categoryId", "addressId", "by", "to"]).then((res: any) => {
                io.sockets.to([...res?.by?.socketId, ...res?.to?.socketId]).emit('sendOrderFalse', { status: true, data: res });
            }).catch((error: any) => {
                socket.emit("sendOrderFalse", { status: false, message: error.message });
            })
        })

        // io.to(this.lUserSocketId).emit(emitEventName, errPayload);
        socket.on("disconnect", async () => {
            console.log(`🚀 ~ Disconnected : ${socket?.me?.email}--${socket?.id}`);
            await models?.User?.findOneAndUpdate({ socketId: { $in: [socket?.id] } }, { $pull: { socketId: socket?.id } });
        });
    });

}

export default { connectSocketServer }