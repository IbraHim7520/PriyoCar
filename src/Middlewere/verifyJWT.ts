import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import envConfig from "../Configs/config";
import { pool } from "../Configs/dbconfig";

const verfyAuthorization = async(...roles:string[]) =>{
    return async(req:Request , res:Response, next:NextFunction)=>{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).send({message: "Unauthorized Access!"})
        }
        const decoded = jwt.verify(token , envConfig.jwt_secret) as JwtPayload;
        const {name , email , role} = decoded;

        const dbUser = await pool.query(`SELECT * FROM Users WHERE email = $1`, [email]);
        if(dbUser.rows.length<=0){
            return res.status(404).send({
                message: "User not found! Please Register."
            })
        }
        if(roles.length && !roles.includes(role)){
            return res.status(401).send({message: "Unauthorized user!"})
        }
        next()
    }
}
export default verfyAuthorization