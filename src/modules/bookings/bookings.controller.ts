import { Request, Response } from "express";
import { bookingsServices } from "./bookings.service";


const createBooking = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        const booking = await bookingsServices.createBooking(payload);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });

    } catch (err: any) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        });
    }
}

export const getBookings = async (req: Request, res: Response) => {
    try {
        const user = req.user!;

        const bookings = await bookingsServices.getBookings(user);
        res.status(200).json({
            success: true,
            message: user.role === "admin" ? "Bookings retrieved successfully" : "Your bookings retrieved successfully",
            data: bookings
        });

    } catch (err: any) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        });
    }
};


const updateBooking = async (req: Request, res: Response) => {
    try {
        const bookingId = req.params.bookingId!;
        const payload = req.body;
        const user = req.user!; 

        const updatedBooking = await bookingsServices.updateBooking(bookingId, payload, user);

        const message =
            payload.status === "cancelled"
                ? "Booking cancelled successfully"
                : "Booking marked as returned. Vehicle is now available";

        res.status(200).json({
            success: true,
            message,
            data: updatedBooking,
        });
    } catch (err: any) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message,
        });
    }
};







export const bookingController = {
    createBooking, getBookings, updateBooking
}