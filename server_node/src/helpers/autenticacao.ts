import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction  } from "express";

interface CustomRequest extends Request {
    user?: string | JwtPayload;
  }

const authenticateToken = (req: Request, res: Response, next: NextFunction) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Nenhum Token informado" });
    }
    jwt.verify(token, process.env.SECRET as string, (error, user) => {
        if (error) {
          return res.status(403).json({ message: "Faleid to authenticate Token" });
        }
        (req as CustomRequest).user = user;
        next();
      });
}

export default authenticateToken;