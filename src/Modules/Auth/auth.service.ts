import { Result } from "pg";
import { pool } from "../../Configs/dbconfig"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import envConfig from "../../Configs/config";
const getLoggedinUser = async(email:string , password:string)=>{
    const dbResult = await pool.query(`SELECT * FROM Users WHERE email=$1`, [email]);
    const hashedPass = dbResult.rows[0].password
    const currentUser = dbResult.rows[0]
    const isMatched = await bcrypt.compare(password , hashedPass)
    
    if(!isMatched){
        return null;
    }
    
    const token = jwt.sign({name:currentUser.name , email , role:currentUser.role }, envConfig.jwt_secret , {expiresIn: "7d"})
    return {token , data:dbResult.rows[0]}
}

export const AuthService = {
    getLoggedinUser
}