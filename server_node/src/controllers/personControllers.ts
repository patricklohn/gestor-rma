import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createPerson(req: any, res: any){
    const {client,supplier,name,email,observation} = req.body;
    try {
        if (!client && !name) {
            return res.status(400).json({ message: "Campo Cliente e nome são obrigatórios!" });
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