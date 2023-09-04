import { PrismaClient } from '@prisma/client'
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config()


import express from "express";


const prisma = new PrismaClient()

// Verifica se o token é válido
export async function VerifyToken(req: any, res: any) {
    const token = req.headers['x-access-token'] as string
    //se o token não existir
    if (!token) {
        res.json({ auth: false, message: "Token não fornecido" })

    }
    //se o token existir
    else{
        jwt.verify(token, process.env.SECRET as string, (err: any, decoded: any) => {
            //se o token estiver inválido
            if (err) {
                res.json({ auth: false, message: "Token inválido" })
            }
            //se o token estiver válido apenas continue com o restante do código
            else {
                req.userId = (decoded as JwtPayload).id;
            }

        })
    }
}

// Cria um usuário e retorna o jwt token para o usuário
export async function CreateUser(req: any, res: any) {
    const { name, email, password } = req.body

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        },
    }).then((u) => {
        // Cria o token
        console.log(process.env.SECRET)
        const token = jwt.sign({ id: u.id }, process.env.SECRET as string, {
            expiresIn: 86400 // expira em 24 horas
        })
        //retirando a senha do usuário antes de retornar
        u.password = ""
        res.json({ auth: true, token: token, user: u })

    //tratando erros
    }).catch((error) => {
        //se o erro for de email duplicado
        if (error.code === "P2002") {
            res.json({ auth: false, message: "Email ja existe" })
        } 
        //se o erro for de senha curta
        else if (error.code === "P2003") {
            res.json({ auth: false, message: "Senha muito curta" })
        }
        else {
            res.json({ auth: false, message: "Erro desconhecido" })
        }
    })
}

// Faz o login do usuário e retorna o jwt token para o usuário
export async function Login(req: any, res: any) {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    }).then((u) => {
        //se o usuário não existir
        if (!u) {
            res.json({ auth: false, message: "Usuário não existe" })
        }
        //se a senha estiver errada
        else if (u.password !== password) {
            res.json({ auth: false, message: "Senha incorreta" })
        }
        //se o usuário existir e a senha estiver correta
        else {
            // Cria o token
            const token = jwt.sign({ id: u.id }, process.env.SECRET as string, {
                expiresIn: 86400 // expira em 24 horas
            })
            //retirando a senha do usuário antes de retornar
            u.password = ""
            u.id = 0
            res.json({ auth: true, token: token, user: JSON.stringify(u) })
        }
    })
}

// Retorna os dados do usuário logado
export async function GetUserData(req: any, res: any) {
    VerifyToken(req, res);

    //fazendo uma consulta ao banco de dados na tabela de links para pegar os links do usuário
    const links = await prisma.link.findMany({
        where: {
            userId: req.userId
        }
    }).then((links) => {
        //dando um refresh no token do usuário
        console.log(req.userId)
        //capturando as informações atualizadas do usuário
        const user = prisma.user.findUnique({
            where: {
                id: req.userId
            }
        }).then((user) => {
            //retirando a senha do usuário antes de retornar
            const token = jwt.sign({ id: req.userId }, process.env.SECRET as string, {
                expiresIn: 86400 // expira em 24 horas
            })
            user!.password = ""
            user!.id = 0
            //pegando apenas a url dos links
            const urls = links.map((link) => {
                return link.url
            })

            res.json({ auth: true, user: JSON.stringify(user), links: JSON.stringify(urls), token: token })
        })

    })
    
}

export async function GetLink(req: any, res: any) {
    const { url } = req.body;
    const links = await prisma.link.groupBy({
        by: ["url"],
        _count: {
            url: true,
            _all: true
        }
    });
    
    // Extraia as URLs únicas da resposta do Prisma
    const uniqueLinks = links.map(link => link.url);

    if (uniqueLinks) {
        res.json({ link: uniqueLinks, error: false });
    } else {
        res.json({ error: true });
    }
}

export async function GetLinkUsers(req: any, res: any) {
    const { url } = req.body;
    console.log(url)
    try {
        // Consulta o Prisma para buscar os userId com base na URL fornecida
        const links = await prisma.link.findMany({
            where: {
                url: url
            },
            select: {
                userId: true
            }
        });

        if (links) {
            // Extrai os userIds das entradas encontradas
            const userIds = links.map(link => link.userId);

            res.json({ userIds: userIds, error: false });
        } else {
            res.json({ error: true, message: "Nenhum usuário encontrado para a URL fornecida." });
        }
    } catch (error) {
        res.status(500).json({ error: true, message: "Ocorreu um erro ao processar a solicitação." });
    }
}

export async function GetUsersEmails(req: any, res: any) {
    const { userIds } = req.body;
    try {
        // Consulta o Prisma para buscar os e-mails correspondentes aos userIds fornecidos
        const emails = await prisma.user.findMany({
            where: {
                id: {
                    in: userIds
                }
            },
            select: {
                email: true
            }
        });

        if (emails.length > 0) {
            // Extrai os e-mails das entradas encontradas
            const emailList = emails.map(user => user.email);

            res.json({ emails: emailList, error: false });
        } else {
            res.json({ error: true, message: "Nenhum e-mail correspondente encontrado." });
        }
    } catch (error) {
        res.status(500).json({ error: true, message: "Ocorreu um erro ao processar a solicitação." });
    }
}

export async function AddLink(req: any, res: any){
    VerifyToken(req, res);
    const {url} = req.body
    const link = await prisma.link.create({
        data: {
            url: url,
            userId: req.userId
        }
    }).then((link) => {
        res.json({link: link, error: false})
    }).catch((error) => {
        res.json({error: true})
    })
}

export async function DeleteLink(req: any, res: any){
    VerifyToken(req, res);
    const {url} = req.body
    const firstLinkFound = await prisma.link.findFirst({
        where: {
            url: url,
            userId: req.userId
        }
    })
    //se o link existir
    if (firstLinkFound){
        const link = await prisma.link.delete({
            where: {
                id: firstLinkFound.id
            }
        }).then((link) => {
            // sucesso
            res.json({link: link, error: false})
        }).catch((error) => {
            //erro
            res.json({error: true})
        })
    }
    //se o link não existir
    else{
        res.json({error: true})
    }
}