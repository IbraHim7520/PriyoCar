import { Request, response, Response } from "express";
import { userService } from "./user.service";

const registerUser = async(req:Request, res:Response)=>{
    try {
        const userPostResult = await userService.postUser(req.body)
        if(userPostResult.rows[0]){
            res.status(200).send({
                success: true, 
                message: "User Registered successfully.",
                data: userPostResult
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
    const user = req.user
    const userid = req.params.userId as string
    
        try {
        const updatedResult = await userService.updateAuser(parseInt(userid) , updatedValue, user)
            res.status(200).send({
                success: true, 
                message: "All User Updated successfully.",
                data: updatedResult
            })
    } catch (error) {
          res.status(201)
        .send({
            success: false,
            message: "No User Found!"
        })
    }
}

const deleteUser = async(req:Request , res:Response) =>{
    const id = parseInt(req.params.userId as string)
    try {
        const deletedUser = await userService.deleteuser(id);
         res.status(200).send({
                success: true, 
                message: "User Deleted successfully.",
                data: deletedUser
        })
    } catch (error:any) {
        res.status(201)
        .send({
            success: false,
            message: error.message || "No User Found!"
        })
    }
}

export const userControllers ={
    registerUser,
    getAllusers,
    updateUser,
    deleteUser
};