import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const loginUser = async(req: Request , res: Response):Promise <void> =>{
    try {
        const {email, password} = req.body;
        const user = await prisma.user.findUnique({ where: { email }});
        if(!user){
            res.status(401).json({message: "Credenciais invalidas!"})
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({message: "Credenciais invalidas!"});
            return
        }

        const token = jwt.sign(
        {
            uuid: user.uuid,
            email: user.email,
            name: user.name,
            role: user.role
        },
        process.env.SECRET as string,
        {
             expiresIn: "1d",
        }
        );

        res.status(200).json({message: "Usuario logado com sucesso!", token: token})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

