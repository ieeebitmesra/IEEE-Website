'use server'
import { prisma } from "@/lib"

export const getUser = async () => {
    const user = await prisma.user.findMany();
    return user;
}