import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

export const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ success: false, message: "Unauthorized Access" });
            }

            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload
            req.user = decoded as Express.UserPayload;
            next();
        } catch (err: any) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }
    };
};



export default auth