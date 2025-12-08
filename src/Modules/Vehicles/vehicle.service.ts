import { pool } from "../../Configs/dbconfig"

const uploadVehicle = async(vehicle_name:string , type:string , registration_number:string , daily_rent_price:number , availability_status:string)=>{
    const insertedData=   await pool.query(`
        INSERT INTO Vehicles (vehicle_name , type , registration_number , daily_rent_price , availability_status)
        VALUES ($1 , $2 , $3 , $4 , $5)
        RETURNING *` , [vehicle_name , type , registration_number, daily_rent_price , availability_status])
    
        return insertedData.rows[0]
}

const getAllVehicles = async() =>{
    const vehicles = await pool.query(`SELECT * FROM Vehicles`);
    return vehicles.rows
}


const getSingleVehicle = async(id:number) =>{
    const vehicle = await pool.query(`
        SELECT * FROM Vehicles WHERE id = $1
        `, [id])
    return vehicle.rows[0]   
}

const deleteVehicle = async(id:number)=>{
    const deleteResult = await pool.query(`DELETE FROM Vehicles WHERE id = $1
        `, [id])
    return deleteResult
}

// const updateVehicle = async(keyField:string[], valueField:string[])=>{
//     console.log(keyField)
//     console.log(valueField)
// }


export const VehicleService = {
    uploadVehicle,
    getAllVehicles,
    getSingleVehicle,
    deleteVehicle
}