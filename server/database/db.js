import mongoose from "mongoose";

export const connectDB =  () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "MERN_Stack_Library_Management_System",
    }).then(() => {
        console.log("Database connected successfully");
    }).catch((error) => {
        console.log("Database connection failed", error);
    }
    );
}