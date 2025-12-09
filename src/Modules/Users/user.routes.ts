import  express  from 'express';
import { userControllers } from './user.controller';
import verfyAuthorization from '../../Middlewere/verifyJWT';

const userRouter = express.Router();



userRouter.post("/" , userControllers.registerUser);

userRouter.get("/", verfyAuthorization("admin") ,userControllers.getAllusers)
userRouter.put("/:userId" , verfyAuthorization("admin", "user") ,userControllers.updateUser);
userRouter.delete("/:userId", verfyAuthorization("admin") ,userControllers.deleteUser);



export default userRouter;