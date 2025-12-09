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

const updateVehicle = async(id:number , payload:Record<string, any>)=>{
  const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
  const result = await pool.query(
    `
    UPDATE Vehicles
    SET vehicle_name = $1,
        type = $2,
        registration_number = $3,
        daily_rent_price = $4,
        availability_status = $5
    WHERE id = $6
    RETURNING *;
    `,
    [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]
  );

  if (result.rows.length === 0) {
    throw new Error("Vehicle not found or update failed");
  }

  return result.rows[0];
}


export const VehicleService = {
    uploadVehicle,
    getAllVehicles,
    getSingleVehicle,
    deleteVehicle,
    updateVehicle
}