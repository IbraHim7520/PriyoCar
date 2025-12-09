import { Router } from "express";
import { bookingController } from "./booking.controller";
import verfyAuthorization from "../../Middlewere/verifyJWT";

const bookingRouter = Router()

bookingRouter.post("/", verfyAuthorization("admin", "user") , bookingController.controlPostBooking)
bookingRouter.get("/", verfyAuthorization("admin", "user") ,bookingController.controlGetAllBooking)
bookingRouter.put("/:bookingId", verfyAuthorization("admin", "user") ,bookingController.controlUpdateBooking)

export default bookingRouter