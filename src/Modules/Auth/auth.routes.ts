import  express  from 'express';
import { authControllers } from './auth.controller';


const Authrouter = express.Router();

Authrouter.post("/", authControllers.LoginControl);
export default Authrouter;
