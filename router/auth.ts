import express from 'express'
const userRouter = express.Router()
import { loginUser, registerController } from '../controller/auth-contoller'


//register
userRouter.post('/register', registerController)


// login
userRouter.post('/login', loginUser)






export = userRouter