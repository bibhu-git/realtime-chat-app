import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './route/user.route.js';
import cookieParser from 'cookie-parser';
import messageRoute from './route/message.route.js';

import { app, server } from './SocketIO/server.js';

app.use(cors());
app.use(cookieParser());
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 4000;
// connect to mongodb database
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connected..");
})
.catch(error => console.log(error));

app.use('/api/user',userRoute);
app.use('/api/message',messageRoute);

app.get('/',(req, res) => {
    res.send("Hello world");
});

server.listen(port, () => {
    console.log(`Example app listen on port ${port}`)
})
