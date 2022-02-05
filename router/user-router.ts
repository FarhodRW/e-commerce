import express from 'express'
import { verifyToken, verifyTokenAdmin, verifyTokenAndAuthorization } from '../middleware/verifyToken'
import { User } from '../model/user'
import bcrypt from 'bcrypt'
const router = express.Router()

//updating user
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 8)
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id,
        {
          $set: req.body
        }, { new: true }
      )
      res.status(201).json(updatedUser)
    } catch (error) {
      res.status(500).json(error)
    }
  }
})


//deleting user

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const removedUser = await User.findByIdAndDelete(req.params.id)
    res.status(201).send(`Deleted user ${removedUser}`)
  } catch (error) {
    res.status(500).send(error)
  }
})

//get a user
router.get('/find/:id', verifyTokenAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(201).send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})

//get all users

router.get('/users', verifyTokenAdmin, async (req, res) => {
  const query = req.query.new

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find()
    res.status(201).send(users)
  } catch (error) {
    res.status(500).send(error)
  }
})


//get user statistics
router.get('/stats', verifyTokenAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: '$createdAt' } } },
      { $group: { _id: "$month", total: { $sum: 1 } } }

    ])
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

export = router