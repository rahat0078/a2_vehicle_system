import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingController } from "./bookings.controller";

const router = Router()

router.post("/", auth(), bookingController.createBooking)
router.get("/", auth(), bookingController.getBookings)
router.put("/:bookingId", auth(), bookingController.updateBooking)


export const bookingRoutes = router