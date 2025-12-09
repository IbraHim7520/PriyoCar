import { Request, Response } from "express"
import { bookingService } from "./booking.service";

const controlPostBooking = async(req:Request, res:Response)=>{
    const BookingInfo = req.body;
    try {
        const bookingResponse = await bookingService.postBooking(BookingInfo)
        res.status(200).send({
            success:true,
            message:"Success",
            data:bookingResponse || null
        })
    } catch (error:any) {
        res.status(201).send({
            success:false,
            message: "Something went wrong!",
            data: error.message
        })
    }
}
const controlGetAllBooking = async(req:Request , res:Response)=>{
    try {
        const allBookings = await bookingService.getAllBookings();
        res.status(200)
        .send({
            success:true,
            message:"All Data retrive successfully!",
            data: allBookings
        })
    } catch (error:any) {
        res.status(201).send({
            success:false,
            message:error.message,
            data:[]
        })   
    }
}
const controlUpdateBooking = async(req:Request  , res:Response )=>{
    const bookingId = req.params.bookingId as string
    const updateDetails = req.body
    try {
        const updateResponse = await bookingService.updateABooking(parseInt(bookingId), updateDetails)
        res.status(200).send({
            success:true,
            message:"Booking Canceled successfully!",
            data:updateResponse
        })
    } catch (error:any) {
        res.status(201)
        .send({
            success:false,
            message:error.message || "Wrong!"
        })
    }
}
export const bookingController ={
controlPostBooking,
controlGetAllBooking,
controlUpdateBooking
}