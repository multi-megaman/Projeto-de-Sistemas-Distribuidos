import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config()


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.SENHA
    }
});

export async function notify(req: any, res: any) {
    const { email, userName } = req.body
    const mail = {
        from: `"RSS Feeder - SD" <${process.env.USER}>`, // sender address
        to: email, // list of receivers
        subject: `Olá, ${userName}!`, // Subject line
        text: "i LOVE DIO", // plain text body
        //html: "<b>Hello world?</b>", // html body
    }
    try {
        await transporter.sendMail(mail)
        console.log("Notificação enviada!");
    } catch (error) {
        console.error("Erro no MS:", error)
    }
}

