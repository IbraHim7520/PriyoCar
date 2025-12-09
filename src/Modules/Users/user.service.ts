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
    const {name , email , phone, role="users" } = userInfo
    const updateUser = await pool.query(`
        UPDATE Users SET name = $1, email =$2 , phone = $3 , role = $4 WHERE id=$5 RETURNING id, name , email , phone , role`,
        [name , email ,  phone , role, userid])
    
    return updateUser.rows[0]
}
const deleteuser = async(id:number) =>{
    if(!id){
        throw new Error("Invalid Id!");
    }
    const deleteQuery = pool.query(
        `DELETE FROM Users WHERE id = $1 RETURNING name , email, phone, role`,
        [id]
    );
    return (await deleteQuery).rows[0]
}

export const userService = {
    postUser,
    getAllUsers,
    updateAuser,
    deleteuser
    
    
}