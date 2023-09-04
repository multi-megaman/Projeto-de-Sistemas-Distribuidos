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
    const { email, title, summary, link } = req.body
    const mail = {
        from: `"RSS Feeder - SD" <${process.env.USER}>`, // sender address
        to: email, // list of receivers
        subject: `News! ${title}`, // Subject line
        //text: "I LOVE DIO", // plain text body
        html: `<b>
        <!-- Título da Notícia -->
        <h1>${title}</h1>
    
        <!-- Resumo da Notícia -->
        <p>${summary}</p>
    
        <!-- Link para a Notícia -->
        <p>Leia mais: <a href="${link}">${link}</a></p></b>`, // html body
    }
    try {
        await transporter.sendMail(mail)
        console.log("Notificação enviada!");
        res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
        console.error("Erro no MS:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

