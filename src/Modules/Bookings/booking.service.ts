import { pool } from "../../Configs/dbconfig";

const postBooking = async (payload: Record<string, any>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date, status="active" } = payload;

    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);
    const today = new Date();

    // Remove time portion for accurate comparison
    // today.setHours(0, 0, 0, 0);
    // start.setHours(0, 0, 0, 0);
    // end.setHours(0, 0, 0, 0);

    if (start < today) {
        throw new Error("Start date cannot be in the past");
    }
    if (end <= start) {
        throw new Error("End date must be greater than start date");
    }
    const diffTime = end.getTime() - start.getTime();
    const totalDays = diffTime / (1000 * 60 * 60 * 24);
    try {
        const vehicleDetailsFromId = await pool.query(`SELECT * FROM Vehicles WHERE id = $1`,[vehicle_id])
        const {id,vehicle_name  ,daily_rent_price, availability_status } = vehicleDetailsFromId.rows[0]
        if(availability_status!=="available"){
            throw new Error("Vehicle is already booked!")
        }
        const total_price = totalDays*daily_rent_price

        const postBookings = await pool.query(`INSERT INTO Bookings
            (customer_id ,vehicle_id, rent_start_date, rent_end_date ,total_price ,status ) 
            VALUES($1 , $2 , $3 , $4 , $5, $6) RETURNING *`,
        [customer_id, vehicle_id , rent_start_date , rent_end_date, total_price  ,status ]
        )
        if(postBookings.rows.length >0){
            const updateVheileStatus = await pool.query(`UPDATE Vehicles SET availability_status = $1 WHERE id = $2`, ["unavailable",id ])
        }
        postBookings.rows[0].vehicle = {
            vehicle_name,
            daily_rent_price
        }
        
        return postBookings.rows[0]
    } catch (error) {
        return error
    }

};

const getAllBookings = async() =>{
    try {
        const allBookings = await pool.query(`SELECT * FROM Bookings`);
        return allBookings.rows
    } catch (error) {
        throw new Error("Failed to retrive data!")
    }
}

const updateABooking = async (id: number, payload: Record<string, any>) => {
    const { status } = payload;

    try {
        const bookingData = await pool.query(
            `SELECT * FROM Bookings WHERE id = $1`,
            [id]
        );

        if (bookingData.rows.length === 0) {
            throw new Error("Booking not found!");
        }

        const { vehicle_id, rent_start_date, rent_end_date } = bookingData.rows[0];

        const startDate = new Date(rent_start_date);
        const endDate = new Date(rent_end_date);
        const currentDate = new Date();

        // Compare only date part
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        // CUSTOMER CANCEL LOGIC
        if (status === "cancelled") {
            if (currentDate >= startDate) {
                throw new Error("Cannot cancel after start date!");
            }

            const updatedBooking = await pool.query(
                `UPDATE Bookings SET status = $1 WHERE id = $2 RETURNING *`,
                ["cancelled", id]
            );

            await pool.query(
                `UPDATE Vehicles SET availability_status = $1 WHERE id = $2`,
                ["available", vehicle_id]
            );

            return updatedBooking.rows[0];
        }

        // ADMIN RETURN LOGIC
        if (status === "returned") {
            if (currentDate < endDate) {
                throw new Error("Cannot mark returned before end date!");
            }

            const updatedBooking = await pool.query(
                `UPDATE Bookings SET status = $1 WHERE id = $2 RETURNING *`,
                ["returned", id]
            );

            await pool.query(
                `UPDATE Vehicles SET availability_status = $1 WHERE id = $2`,
                ["available", vehicle_id]
            );

            return updatedBooking.rows[0];
        }

        // INVALID STATUS
        throw new Error("Invalid status instruction!");

    } catch (error) {
        throw error; // return clean error
    }
};


export const bookingService = {
    postBooking,
    getAllBookings,
    updateABooking
}