import { prisma } from "../config/prisma.js"
import { CreatePostSchema } from "../schemas/posts.schema.js"
import { ZodError } from "zod"

export const getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        lastname: true,
                        email: true,
                    }
                }
            }
        })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    try {
        const { body } = req
        const validatedPost = CreatePostSchema.parse(body)
        const user = await prisma.user.findUnique({
            where: {
                id: validatedPost.user_id,
            }
        })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const post = await prisma.post.create({
            data: validatedPost
        })
        return res.status(201).json(post)

    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                errors: error.issues,
            });
        }
        return res.status(500).json({ message: error.message })
    }
}

export const transactionsExample = async (req, res) => {
    try {
        await prisma.$transaction(async (tx) => {
            const post = await tx.post.create({
                data: {
                    title: "Transaction Example",
                    content: "This is a transaction example",
                    user_id: 1,
                }
            })
            return res.status(201).json(post)
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const upsertExample = async (req, res) => {
    try {
        const { postId } = req.params

        const post = await prisma.post.upsert({
            where: {
                id: Number(postId),
            },
            create: {
                title: "",
                content: "",
                user_id: 1,
            },
            update: {
                title: "",
                content: "",
                user_id: 1,
            },
        })
        return res.status(201).json(post)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}