import { PrismaClient } from "@prisma/client";
import { Request, response, Response } from "express";

const prisma = new PrismaClient();

async function createWarranty(req: Request, res: Response){
    try {
        const {description, serial_number, data_start, data_end, data_buy, 
            product, supplier,client, invoice, invoice_arq, status, defect,notes, order_service} = req.body;

        if (!description) {
            res.status(400).json({message: "O campo DESCRIÇÃO é obrigatório!"});
            return
        }
        if(!defect){
            res.status(400).json({message: "O campo DEFITO é obrigatório!"})
            return
        }

        const fileArq = req.file || null;

        const warrantyCreate = await prisma.warranty.create({
            data:{
                description,
                serial_number,
                data_start,
                data_end,
                data_buy,
                invoice,
                invoice_arq: fileArq?.filename,
                status,
                defect, 
                notes,
                order_service,
                product:{
                    connect:{
                        uuid: product
                    }
                },
                supplier:{
                    connect:{
                        uuid: supplier
                    }
                },
                client:{
                    connect:{
                        uuid: client
                    }
                }
            }
        })
        res.status(201).json({message: "Garantia registrada com sucesso!", warranty: warrantyCreate})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
}

async function deleteWarranty(req: Request, res: Response){
    try {
        const uuid: string = req.params.uuid; 
        const warrantyDelete = await prisma.warranty.delete({
            where: {uuid}
        })
        res.status(200).json({message: "Garantia deletada com sucesso!", warranty: warrantyDelete})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
}

async function getAllWarranty(req: Request, res: Response){
    try {
        const warrantyAll = await prisma.warranty.findMany()
        if(!warrantyAll){
            res.status(404).json({message: "Nenhuma garantia encontrada!"})
            return
        }
        res.json(warrantyAll)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
}

async function getAllWarrantyById(req: Request, res: Response){
    try {
        const uuid: string = req.params.uuid;
        const warrantyUuid = await prisma.warranty.findMany({
            where: {uuid},
        })
        if(!warrantyUuid){
            res.status(404).json({message: "Nenhuma garantia encontrada!"})
            return
        }
        res.json(warrantyUuid)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
}

async function updateWanrranty(req: Request, res: Response){
    try {
        const uuid: string = req.params.uuid;
        const {description, serial_number, data_start, data_end, data_buy, 
            product, supplier,client, invoice, invoice_arq, status, defect,notes, order_service} = req.body;
        
        if (!description) {
            res.status(400).json({message: "O campo DESCRIÇÃO é obrigatório!"});
            return
        }
        if(!defect){
            res.status(400).json({message: "O campo DEFEITO é obrigatório!"})
            return
        }

        const fileArq = req.file || null;

        const warrantyUpdate = await prisma.warranty.update({
            where: {uuid},
            data:{
                description,
                serial_number,
                data_start,
                data_end,
                data_buy,
                invoice,
                invoice_arq: fileArq?.filename,
                status,
                defect, 
                notes,
                order_service,
                product:{
                    connect:{
                        uuid: product
                    }
                },
                supplier:{
                    connect:{
                        uuid: supplier
                    }
                },
                client:{
                    connect:{
                        uuid: client
                    }
                }
            }
        })

        res.status(201).json({response: "Garantia atualizada com sucesso!", warranty: warrantyUpdate})

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
}

export default {
    createWarranty,
    deleteWarranty,
    getAllWarranty,
    getAllWarrantyById,
    updateWanrranty
}