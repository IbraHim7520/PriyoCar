import { Request, Response } from "express";
import { VehicleService } from "./vehicle.service";

const uploadVehicle = async(req:Request, res:Response)=>{
const {vehicle_name , type , registration_number , daily_rent_price , availability_status} = req.body
const renPrice = parseInt(daily_rent_price);

try {
    const response = await VehicleService.uploadVehicle(vehicle_name , type , registration_number , renPrice , availability_status)
    res.status(200).send({
                success: true, 
                message: "Vehicle created successfully",
                data: response
            })
    } catch (error) {
      
        res.status(201)
        .send({
            success: false,
            message: "Failed to create vehicle!!",
            error
        })
    }
} 

const getVehicles = async(req:Request , res:Response)=>{
    try {
        const allVehicles = await VehicleService.getAllVehicles();
        res.status(200).send({
            success:true,
            message: "Vehicles Retrived!",
            data:allVehicles
        })
    } catch (error) {
        res.status(201).send({
            success: false,
            message: "Something went wrong!",
            error
        })
    }
}

const getSingleVehicle = async(req:Request , res:Response)=>{
    const vehicleID = req.params.vehicleId as string 
    try {
        const vehiclePaper = await VehicleService.getSingleVehicle(parseInt(vehicleID))
        res.status(200).send({
            success:true,
            message: "Vehicale info retrive",
            data: vehiclePaper
        })
    } catch (error) {
        res.status(201).send({
            success:false,
            message: "Something went wrong",
            data:null
        })
    }

    }

const deleteAVegicle = async(req:Request, res:Response)=>{
    const deleteID = req.params.vehicleId as string
    try {
        const deleteResult = await VehicleService.deleteVehicle(parseInt(deleteID))
        res.status(200).send({
            success:true,
            message: "Vehicale Deleted",
            data: deleteResult
        })
    } catch (error) {
          res.status(201).send({
            success:false,
            message: "Something went wrong",
            data:null
        })
    }
}


const updateAVehicle = async(req:Request , res:Response)=>{
    const id = req.params.vehicleId as string
    const updatedData = req.body
    try {
        const updatedResponse = await VehicleService.updateVehicle(parseInt(id) , updatedData);
        res.status(200).send({
            success:true,
            message:"Vehicle updated successfully!",
            data:updatedResponse
        })
    } catch (error:any) {
            res.status(201).send({
            success:false,
            message:"failed to update Vehicle!",
            data:[]
        })
    }
}
export const vehicleControllers ={
    uploadVehicle,
    getVehicles,
    getSingleVehicle,
    deleteAVegicle,
    updateAVehicle
}