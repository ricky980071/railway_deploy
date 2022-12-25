import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';

dotenv.config();
export default {
    
    connect: () => { 
        console.log(process.env.MONGO_URL)
        console.log("//////////////////////")
        mongoose.connect( process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })
        .then((res) => console.log("mongo db connection created")); }
};