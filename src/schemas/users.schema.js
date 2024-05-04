import { z } from "zod"

export const CreateUserSchema = z.object({
    name: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(["ADMIN", "USER"]),
})

export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    role: z.enum(["ADMIN", "USER"]).optional(),
})