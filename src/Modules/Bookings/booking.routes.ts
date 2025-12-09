import { Router } from "express";
import { bookingController } from "./booking.controller";

const bookingRouter = Router()

bookingRouter.post("/", bookingController.controlPostBooking)
bookingRouter.get("/", bookingController.controlGetAllBooking)
bookingRouter.put("/:bookingId", bookingController.controlUpdateBooking)

export default bookingRouter