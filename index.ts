import express from 'express'
const app = express()
const port = 4000
import CORS from 'cors';
import { connectDB } from './configs/connect.DB';
import userRouter from './routes/user/index.route'; 


app.use(CORS({
  origin: process.env.FE_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); 

app.use('/user', userRouter);
connectDB();



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 