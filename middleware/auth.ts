import jwt from 'jsonwebtoken'
import { UserDefinedError } from '../db/common/common.error'
import { User } from '../db/model/user/user.model'

export const verifyToken = (req: any, res: any, next: any) => {
  const authToken = req.headers.authorization
  console.log(authToken)

  if (authToken) {
    const token = authToken.split(' ')[1]
    console.log(token)
    jwt.verify(token, process.env.SECRET_PAS_KEY || 'fahadev21', async (err: any, data: any) => {
      if (err) {
        res.status(403).json('Token is not valid!');
      }
      console.log(token)
      const user = await User.findById(data.id)
      if (!user) {
        res.status(403).json('Token is not valid!');
      }
      req.user = user;
      next()
    })
  }
  else { return res.status(401).send('You are not authenticated') }
}

export async function verifyAdmin(req, res, next) {
  try {
    if (!req.user.isAdmin) throw UserDefinedError.NotEnoughPermission(req.user._id)
    next()
  } catch (e) {
    next(e)
  }

}

