import app from "./app";
import envConfig from "./Configs/config";

app.listen(envConfig.port , ()=>{
    console.log(`Sever is running on Port: ${envConfig.port}`);
})