import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUser(req: any, res: any) {
    const { id } = req.query
    const { name, email, password } = req.body

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        },
    }).then((u) => {res.json(user)
    }).catch((error) => {res.json(error)})
}

export async function updateUser(req: any, res: any) {
    const id = req.params.id
    const { name, email, password } = req.body

    const updatedUser = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: name,
            email: email,
            password: password,
        },
    }).then((u) => {res.json(u)
    }).catch((error) => {res.json(error)})
}

export async function deleteUser(req: any, res: any) {
    const id = req.params.id
    const deletedUser = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    }).then((u) => {res.json(u)
    }).catch((error) => {res.json(error)})
}

export async function readUser(req: any, res: any) {
    const id = req.params.id
    const readUser = await prisma.user.findFirst({
        where: {
            id: parseInt(id)
        }
    }).then((u) => {res.json(u)
    }).catch((error) => {res.json(error)})
}

export async function readFeed(req: any, res: any) {
    const id = req.params.id
    const feed = await prisma.usersLinks.findMany({
        where: {
            userId: parseInt(id)
        }
    }).then((u) => {res.json(u)
    }).catch((error) => {res.json(error)})
}

export async function addFeed(req: any, res: any) {
    const { id } = req.query
    const { url } = req.body

    const link = await prisma.link.create({
        data: {
            url: url
        },
    }).then((u) => {res.json(u)
    }).catch((error) => {res.json(error)})
}
