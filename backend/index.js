import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
import userRoutes from "../backend/Routes/user.route.js"
const app =express();
dotenv.config();
app.use(express.json());
mongoose.connect(process.env.MONGO)
.then(
    ()=>{
        console.log('Mongodb is connected!');
    }
).catch((err)=>{
    console.log("error not connected mongodb", err);
})
app.use('/Api/user',userRoutes); 
app.listen(3007,()=>{
    console.log('server is running on port 4000!');
}) 