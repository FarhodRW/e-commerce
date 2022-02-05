import express from 'express'
const userRouter = express.Router()
import { User } from '../model/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//register
userRouter.post('/register', async (req, res) => {
  console.log(req.body)
  const dto = req.body
  const hashedPassword = await bcrypt.hash(dto.password, 8)
  const newUser = new User({
    username: dto.username,
    email: dto.email,
    password: hashedPassword
  })
  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)

  } catch (error) {
    res.status(500).send(error)
  }

})


// login
userRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    !user && res.status(404).send('User not found')

    const compare = await bcrypt.compare(req.body.password, user.password)
    if (!compare)
      res.status(401).send('Username or password is incorrect')

    const { password, ...others } = user._doc


    const token = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    }, String(process.env.JWT_KEY), { expiresIn: "1d" })


    res.status(200).send({ ...others, token })
  } catch (error) {

  }
})






export = userRouter