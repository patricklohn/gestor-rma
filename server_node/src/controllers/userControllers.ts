import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { cryptPassword } from "../helpers/cryptPassword";

const prisma = new PrismaClient();

async function createUser(req: Request,res: Response){
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            res.status(400).json({message: "Os campos do formulario são obrigatorios!"})
        }
        const hashedPassword = await cryptPassword(password);
        const userCreate = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword
            }
        })
        res.status(201).json({message: "Usuario criado com sucesso!", user: userCreate.name})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"})
    }
}

async function getAllUsers(req: Request, res: Response){
    try {
        const userAll = await prisma.user.findMany()
        if(!userAll){
            res.status(404).json({message: "Nenhum usuario encontrado!"})
        }
        res.json(userAll);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"})
    }
}

export default {
    createUser,
    getAllUsers
}

