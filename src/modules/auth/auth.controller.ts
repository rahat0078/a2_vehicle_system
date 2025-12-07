import { Request, Response } from "express"
import { authServices } from "./auth.service"

const signUpUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password || !phone || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 cheracters"
            });
        }

        const result = await authServices.signUpUser(req.body)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const signInUser = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body
        const result = await authServices.signInUser(email, password)
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const authControllers = {
    signUpUser, signInUser
}