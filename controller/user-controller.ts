import { User } from '../model/user'
import bcrypt from 'bcrypt'
import { userJoiSchema } from '../middleware/validation'



export async function updateUser(req: any, res: any) {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 8)
    try {
      const validation = await userJoiSchema.validateAsync(req.body)

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
}

export async function deleteUser(req: any, res: any) {
  try {
    const removedUser = await User.findByIdAndDelete(req.params.id)
    res.status(201).send(`Deleted user ${removedUser}`)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function getUser(req: any, res: any) {
  try {
    const user = await User.findById(req.params.id)
    res.status(201).send(user)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function getAllUsers(req: any, res: any) {
  const query = req.query.new

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find()
    res.status(201).send(users)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function getUserStats(req: any, res: any) {
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
}