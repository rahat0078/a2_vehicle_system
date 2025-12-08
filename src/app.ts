import express, { Request, Response } from 'express';
import { initDB } from './config/db';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/users/users.routes';
import { vehiclesRoutes } from './modules/vehicles/vehicles.routes';
import { bookingRoutes } from './modules/bookings/bookings.routes';

const app = express();
app.use(express.json());




// auth user login and signup
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/vehicles", vehiclesRoutes)
app.use("/api/v1/bookings", bookingRoutes)



app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
        path: req.path
    })
})

export default app