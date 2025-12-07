import express, { Request, Response } from 'express';
import { initDB } from './config/db';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/users/users.routes';

const app = express();
app.use(express.json());


// initializing database
initDB();


// auth user login and signup
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)



app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
        path: req.path
    })
})

export default app