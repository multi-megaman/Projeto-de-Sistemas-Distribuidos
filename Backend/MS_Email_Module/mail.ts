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

export async function notify(data: { email: any; title: any; summary: any; link: any; }) {
    const { email, title, summary, link } = data
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
    } catch (error) {
        console.error("Erro no MS:", error);
    }
}

export async function notifyAll(req: any, res: any) {
    const { emailsList, entry } = req.body;

    console.log(req.body)

    // Use Promise.all para esperar que todas as notificações sejam enviadas
    try {
        await Promise.all(emailsList.map(async (email: string) => {
            let data = {
                email,
                title: entry.title || '',
                summary: entry.summary || '',
                link: entry.link || '',
            };

            await notify(data);
        }));
        res.status(200).json({ message: "All notifications sent successfully" });
    } catch (error) {
        console.error("Erro no MS:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}