const fast2sms = require('fast-two-sms');

export const sendMessage = (numbers: any, otp: number) => {
    return new Promise((resolve, reject) => {
        var options = {
            authorization: process.env.MESSAGE_AUTH_KEY,
            message: `Your MenOnline verification code is ${otp}. Please do not share it with anybody`,
            numbers
        }

        fast2sms.sendMessage(options).then((result: any) => {
            reject(result)
        }).catch((error: any) => {
            resolve(error)
        })
    })
}