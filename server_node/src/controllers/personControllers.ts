import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

async function createPerson(req: Request, res: Response){
    const {client,supplier,name,email,observation} = req.body;
    try { 
          if (!name) {
            return res.status(400).json({ message: "O campo NOME é obrigatório!" });
          }

        const person = await prisma.person.create({
            data:{
                client: client,
                supplier: supplier,
                name: name,
                email: email,
                observation: observation
            }
        })

        res.status(201).json({
            message: "Pessoa criada com sucesso!",
            category: person,
          });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})}   
}

async function deletePerson(req: Request, res: Response){
    try {
        const uuid: string = req.params.uuid;
        const personDelete = await prisma.person.delete({
            where: {uuid},
        });
        res.status(200).json({
            message: "Person deletado com sucesso!",
            person: personDelete
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
}