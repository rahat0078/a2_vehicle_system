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


export const bookingController = {
    createBooking
}