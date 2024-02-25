import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from './routes/UserRoute';


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => console.log('Connected to database !'))

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', userRoute);

app.listen(8000, () => {
    console.log('Server started on localhost:8000');
});