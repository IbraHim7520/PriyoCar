import {Pool} from "pg"
import envConfig from "./config"
export const pool = new Pool({
        connectionString: envConfig.connection_string
})
export const createDatabase = async() =>{
    
    

    await pool.query(`
    CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(300) NOT NULL UNIQUE,
        password VARCHAR(300) NOT NULL CHECK(LENGTH(password)>=6),
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(50) NOT NULL

    )     
        `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Vehicles(
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(300) NOT NULL,
            type VARCHAR(100) DEFAULT 'Not Specified',
            registration_number VARCHAR(200) NOT NULL UNIQUE,
            daily_rent_price INT NOT NULL CHECK((daily_rent_price)>=0),
            availability_status VARCHAR(200)
            )
            `)
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES Users(id) ON DELETE CASCADE,
        vehicle_id INT REFERENCES Vehicles(id) ON DELETE CASCADE,
        rent_start_date TIMESTAMP DEFAULT NOW(),
        rent_end_date TIMESTAMP,
        total_price INT NOT NULL CHECK((total_price)>=0),
        status VARCHAR(20)
        )
        
        `)


}
