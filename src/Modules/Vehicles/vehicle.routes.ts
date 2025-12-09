import  express  from 'express';
import { vehicleControllers } from './vehicle.controller';

const VehicleRouter = express.Router();


    VehicleRouter.post("/" , vehicleControllers.uploadVehicle);
    VehicleRouter.get("/", vehicleControllers.getVehicles)
    VehicleRouter.get("/:vehicleId", vehicleControllers.getSingleVehicle)
    VehicleRouter.delete("/:vehicleId", vehicleControllers.deleteAVegicle)
    VehicleRouter.put("/:vehicleId", vehicleControllers.updateAVehicle )

export default VehicleRouter