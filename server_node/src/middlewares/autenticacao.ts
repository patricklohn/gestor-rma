import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction  } from "express";

interface CustomRequest extends Request {
    user?: string | JwtPayload;
  }

const authenticateToken = (req: Request, res: Response, next: NextFunction) =>{
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
        next();
      });
}

export default authenticateToken;