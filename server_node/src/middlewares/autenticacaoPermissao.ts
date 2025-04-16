import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction  } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface CustomRequest extends Request {
    user?: string | JwtPayload;
  }

const authenticateTokenPermission = (req: Request, res: Response, next: NextFunction) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Nenhum Token informado" });
        return 
    }
    jwt.verify(token, process.env.SECRET as string, (error) => {
        if (error) {
          res.status(403).json({ message: "Error authenticate Token" });
          return
        }
        const decod = jwt.verify(token, process.env.SECRET as string);
        const permision = (decod as any).role; 

        if(permision != "Adm"){
          res.status(403).json({ message: "Usuario não autorizado" });
          return
        }

        next();
      });
}

export default authenticateTokenPermission;