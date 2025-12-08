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

const updateUser = async (req: Request, res: Response) => {
    try {
        const result = await usersServices.updateUser(req, req.params.userId as string);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result,
        });

    } catch (err: any) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message,
        });
    }
};


const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.userId
    try {
        const result = await usersServices.deleteUser(userId as string)
        if (result.rowCount !== 0) {
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Vehicle Not Found"
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}




export const usersControllers = {
    getUsers, updateUser, deleteUser
}