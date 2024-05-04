import { prisma } from "../config/prisma.js"
import { CreateUserSchema, UpdateUserSchema } from "../schemas/users.schema.js"
import { ZodError } from "zod"
import bcrypt from "bcrypt"

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                posts: true,
            }
        })
        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({
            errors: error.message,
        });
    }
}

export const createUser = async (req, res) => {
    try {
        const { body } = req;
        const validatedBody = CreateUserSchema.parse(body);
        validatedBody.password = await bcrypt.hash(validatedBody.password, 10);

        const user = await prisma.user.create({
            data: validatedBody,
        })

        return res.status(201).json(user)

    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                errors: error.issues,
            });
        }
        return res.status(500).json({
            errors: error.message,
        });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            errors: error.message,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { body } = req;
        const validatedBody = UpdateUserSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        })
        if (!user) {
            return res.status(404).json({
                errors: "User not found",
            });
        }

        if (validatedBody.password) {
            validatedBody.password = await bcrypt.hash(validatedBody.password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(userId),
            },
            data: validatedBody,
        })

        return res.status(200).json(updatedUser)

    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                errors: error.issues,
            });
        }

        return res.status(500).json({
            errors: error.message,
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });

        if (!user) {
            throw new Error("user not found");
        }

        await prisma.user.delete({
            where: {
                id: parseInt(userId),
            },
        });

        return res.status(200).json({ message: "User deleted" });
    } catch (error) {
        return res.status(500).json({
            errors: error.message,
        });
    }
};