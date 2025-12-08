import { Request, response, Response } from "express";
import { AuthService } from "./auth.service";


const LoginControl = async(req:Request , res:Response) =>{
    const { email, password} = req.body;
    
    try {
        const result = await AuthService.getLoggedinUser(email , password)
            res.status(200).send({
                success: true, 
                message: "User Logged in successfully.",
                data: result
            })
    } catch (error) {
        res.status(201)
        .send({
            success: false,
            message: "Failed to login!"
        })
    }
}
export const authControllers = {
    LoginControl
};