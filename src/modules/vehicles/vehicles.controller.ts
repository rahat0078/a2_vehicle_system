import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";

const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.createVehicle(req.body)
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.getAllVehicles();
        if (result.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: []
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const getSingleVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.getSingleVehicle(req.params.id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


/// update


const deleteVehicle = async (req: Request, res: Response) => {
    const vehicleId = req.params.vehicleId
    try {
        const result = await vehiclesServices.deleteVehicle(vehicleId as string)
        if (result.rowCount !== 0) {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
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





export const vehiclesControllers = {
    createVehicle, getAllVehicles, getSingleVehicle, deleteVehicle
}