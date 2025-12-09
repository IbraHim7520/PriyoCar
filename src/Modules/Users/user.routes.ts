import  express  from 'express';
import { userControllers } from './user.controller';
import verfyAuthorization from '../../Middlewere/verifyJWT';

const userRouter = express.Router();



userRouter.post("/" , userControllers.registerUser);
userRouter.get("/",  userControllers.getAllusers)
userRouter.put("/:userId" ,userControllers.updateUser);
userRouter.delete("/:userId", userControllers.deleteUser);



export default userRouter;