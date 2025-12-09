import express, { Request, Response } from "express"
import envConfig from "./Configs/config";
import userRouter from "./Modules/Users/user.routes";
import { createDatabase } from "./Configs/dbconfig";
import Authrouter from "./Modules/Auth/auth.routes";
import VehicleRouter from "./Modules/Vehicles/vehicle.routes";
import bookingRouter from "./Modules/Bookings/booking.routes";

const app = express();
app.use(express.json());




app.get('/', (req:Request , res:Response)=>{
    res.send({
        message: "Welcome to Priyo Car.\n A Most Trusted and authorized car renter webstore in Bangladesh."
    })
} )



createDatabase();


app.use('/api/v1/auth/signup', userRouter); // user registration
app.use("/api/v1/auth/signin", Authrouter) // user login

//*Vehicles routes-------------------------->
app.use("/api/v1/vehicles", VehicleRouter); //!post a vehicle
app.use("/api/v1/vehicles", VehicleRouter) //*get all vehicles
app.use("/api/v1/vehicles", VehicleRouter) //?Get a single vehicle
app.use("/api/v1/vehicles", VehicleRouter) //!delete a vehicle


//?users routes--------------------------------------->
app.use("/api/v1/users", userRouter) //?get all users
app.use("/api/v1/users", userRouter) //*update a user
app.use("/api/v1/users", userRouter) //! delete a user


//!Bookings routes -------------------------------------->
app.use("/api/v1/bookings",bookingRouter) //? post a booking
app.use("/api/v1/bookings", bookingRouter) //! get all bookings
app.use("/api/v1/bookings", bookingRouter) //* update a booking


export default app;