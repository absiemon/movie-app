import nodemailer from 'nodemailer';

export async function emailConfig(){
    try {
        let config = {
            service : 'gmail',
            auth : {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        }
        let transporter = nodemailer.createTransport(config);
        return transporter;
    } catch (error) {
        throw new Error({
            error: error,
            message: 'internal server error',
            details: error.message,
        });
    }
}