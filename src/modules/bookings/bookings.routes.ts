import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingController } from "./bookings.controller";

const router = Router()

router.post("/", auth(), bookingController.createBooking)
router.get("/", auth(), bookingController.getBookings)


export const bookingRoutes = router