import { Request, Response } from "express";
import { usersServices } from "./users.service"

const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await usersServices.getUsers()
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const usersControllers = {
    getUsers
}