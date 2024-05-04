import { prisma } from "../config/prisma.js";
import { CreateUserSchema } from "../schemas/users.schema";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        const { body } = req
        const validatedBody = CreateUserSchema.parse(body)
        validatedBody.password = await bcrypt.hash(validatedBody.password, 10)

        let user = await prisma.user.create({ data: validatedBody })
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email
        }
        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign({ id: user.id }, secretKey)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}