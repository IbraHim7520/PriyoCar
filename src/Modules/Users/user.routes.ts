import  express  from 'express';
import { userControllers } from './user.controller';

const userRouter = express.Router();



userRouter.post("/" , userControllers.registerUser);
userRouter.get("/", userControllers.getAllusers)
userRouter.put("/:userId", userControllers.updateUser);
userRouter.delete("/:userId", userControllers.deleteUser);



export default userRouter;