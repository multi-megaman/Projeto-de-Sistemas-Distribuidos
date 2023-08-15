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