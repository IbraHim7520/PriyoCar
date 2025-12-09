import  express  from 'express';
import { vehicleControllers } from './vehicle.controller';
import verfyAuthorization from '../../Middlewere/verifyJWT';

const VehicleRouter = express.Router();


    VehicleRouter.post("/" , verfyAuthorization("admin") ,vehicleControllers.uploadVehicle);
    VehicleRouter.get("/", vehicleControllers.getVehicles)
    VehicleRouter.get("/:vehicleId", vehicleControllers.getSingleVehicle)
    VehicleRouter.delete("/:vehicleId", verfyAuthorization("admin") , vehicleControllers.deleteAVegicle)
    VehicleRouter.put("/:vehicleId", verfyAuthorization("admin") ,vehicleControllers.updateAVehicle )

export default VehicleRouter