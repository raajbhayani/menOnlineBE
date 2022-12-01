import fast2sms from 'fast-two-sms';

export const sendMessage = (numbers, otp) => {
    return new Promise((resolve, reject) => {
        var options = {
            authorization: process.env.MESSAGE_AUTH_KEY,
            message: `Your MenOnline verification code is ${otp}. Please do not share it with anybody`,
            numbers
        }

        fast2sms.sendMessage(options).then((result) => {
            reject(result)
        }).catch((error) => {
            resolve(error)
        })
    })
}