import dotenv from 'dotenv'
import express from "express";
import mongoose from "mongoose";
import auth from './router/auth';
import userRouter from './router/user-router';
import productRouter from './router/product-router'
import { UserDefinedError } from './db/common/common.error';
import categoryRouter from './router/category-router';
import orderRouter from './router/order-router';

const app = express();

dotenv.config({});

mongoose.connect(String(process.env.MONGO_DB))
  .then(() => console.log(`App is connected to database`))
  .catch(() => console.log('can\'t connect to db'))
mongoose.set('debug', true);

app.use(express.json());

app.use('/user/auth', auth)
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/order', orderRouter)


app.use((err, req, res, next) => {

  if (err instanceof UserDefinedError) {
    res.status(400).send(err)
  } else {
    res.status(500).send(UserDefinedError.ServerError())
  }
})


app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})