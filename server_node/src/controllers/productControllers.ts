import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

async function createProduct(req: Request, res: Response){
    const {description, observation} = req.body;
    try {
        if(!description){
            res.status(400).json({message: "O campo DESCRIÇÃO é obrigatório!"})
            return
        }

        const productCreate = await prisma.product.create({
            data:{
                description,
                observation
            }
        })

        res.status(201).json({message: "Produto criado com sucesso!", product: productCreate})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

async function getProductAll(req: Request, res: Response){
    try {
        const productAll = await prisma.product.findMany()
        if(!productAll){
            res.status(404).json({message: "Nenhum produto encontrado!"})
            return
        } 
        res.json(productAll)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"})
    }
}

async function getProductById(req: Request, res: Response){
    try {
        const uuid: string = req.params.uuid;
        const productId = await prisma.product.findMany({
            where: {uuid},
        })
        if(!productId){
            res.status(404).json({message: "Nenhum produto encontrado com essa busca!"})
            return
        } 
        res.json(productId)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"})
    }
}

async function deleteProduct(req: Request, res: Response){
    try {
        const uuid: string = req.params.uuid;
        const productId = await prisma.product.findMany({
            where: {uuid},
        })
        if(!productId){
            res.status(404).json({message: "Nenhum produto encontrado com essa busca!"})
            return
        } 
        const productDelete = await prisma.product.delete({
            where: {uuid},
        })
        res.status(200).json({message: "Produto deletado com sucesso!", product: productDelete})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"})
    }
}

async function updateProduct(req: Request, res: Response){
    try {
        const uuid: string = req.params.uuid;
        const {description, observation} = req.body;
        const productUpdate = await prisma.product.update({
            where: {uuid},
            data:{
                description,
                observation
            }
        })
        res.status(200).json({message: "Produto atualizado com sucesso!", product: productUpdate})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"})
    }
}

export default {
    createProduct,
    getProductAll,
    getProductById,
    deleteProduct,
    updateProduct
}