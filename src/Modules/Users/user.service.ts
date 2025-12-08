import { hashSync } from "bcryptjs";
import { pool } from "../../Configs/dbconfig";

interface IUserData {
    [key:string]:any
}
const postUser = async(userData:IUserData)=>{
    const {name , email , password , phone, role} = userData;
    const encryptedPass = hashSync(password , 10);
    const result = await pool.query(`
        INSERT INTO Users(name , email , password ,phone, role) VALUES($1 , $2 , $3 , $4, $5) RETURNING *
        `, [name , email , encryptedPass , phone , role])
        return result;
}
const getAllUsers = async()=>{
    const usersdata = await pool.query(`
        SELECT * FROM Users `)
    return usersdata.rows;
}

interface IuserInfo {
    name?:string,
    email?:string,
    phone?:string,
    role?:string
}
const updateAuser = async(userid:number , userInfo:IuserInfo) =>{
    const userinfokeys:string[] = Object.keys(userInfo)
    const userinfoValues:string[] = Object.values(userInfo)

    console.log(userInfo)
}

export const userService = {
    postUser,
    getAllUsers,
    updateAuser
    
    
}