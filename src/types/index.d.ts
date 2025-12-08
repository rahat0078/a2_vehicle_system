import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface UserPayload extends JwtPayload {
            id: number;
            role: "admin" | "customer";
        }

        interface Request {
            user?: UserPayload;
        }
    }
}
