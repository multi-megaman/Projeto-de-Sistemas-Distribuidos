import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'nekokyousuke@gmail.com',
        pass: 'riqodhdlmyuxcnab'
    }
});

export async function notify(req: any, res: any) {
    const { email, userName } = req.body
    const mail = {
        from: '"RSS Feeder - SD" <nekokyousuke@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Olá, ${userName}!', // Subject line
        text: "Hello world?", // plain text body
        //html: "<b>Hello world?</b>", // html body
    }
    try {
        await transporter.sendMail(mail)
        console.log("Notificação enviada!");
    } catch (error) {
        console.error("Erro no MS:", error)
    }
}

