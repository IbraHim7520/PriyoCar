import { Request, response, Response } from "express";
import { userService } from "./user.service";

const registerUser = async(req:Request, res:Response)=>{
    try {
        const userPostResult = await userService.postUser(req.body)
        if(userPostResult.rows[0]){
            res.status(200).send({
                success: true, 
                message: "User Registered successfully.",
                data: userPostResult.rows[0]
            })
        }
    } catch (error) {
        res.status(201)
        .send({
            success: false,
            message: "No Request Body Found!"
        })
    }
}
const getAllusers = async(req:Request, res:Response) =>{
    try {
        const usersData = await userService.getAllUsers()
            res.status(200).send({
                success: true, 
                message: "All Users Find successfully.",
                data: usersData
            })
    } catch (error) {
          res.status(201)
        .send({
            success: false,
            message: "No User Found!"
        })
    }
}
const updateUser = async(req:Request, res:Response) =>{
    const updatedValue = req.body;
    const userid = req.params.userId as string
    const updatedResult = await userService.updateAuser(parseInt(userid) , updatedValue)
}

export const userControllers ={
    registerUser,
    getAllusers,
    updateUser
};