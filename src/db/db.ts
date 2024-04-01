import mongoose from "mongoose";

export async function connectDb(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("Mongodb Connected to the database")
        });

        connection.on("error",(err)=>{
            console.log("Error while connecting mongodb",err);
            process.exit();
        })
        
    } catch (error) {
        console.log("Something went wrong in connecting to database");
        console.log(error);
        
    }
}