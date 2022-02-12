import { User } from '../db/model/user/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateIt } from '../middleware/validation'
import { UserDtoGroup, UserDto } from '../dto/user.dto'
import { createUserService, getUserByUserNameService } from '../service/user.service'
import { UserError } from '../db/model/user/user.error'
import { success } from '../middleware/methods'

export async function registerController(req, res, next) {
  try {
    const dto = await validateIt(req.body, UserDto, UserDtoGroup.REGISTER)

    dto.password = await bcrypt.hash(dto.password, 8)
    const user = await createUserService(dto);

    success(res, user)
  } catch (error) {
    next(error)
  }
}

export async function loginUser(req: any, res: any, next) {
  try {
    const data = await validateIt(req.body, UserDto, UserDtoGroup.LOGIN)
    let user = await getUserByUserNameService(data.username)

    const compare = await bcrypt.compare(data.password, user.password)
    if (!compare) throw UserError.NotFound(data.username)
    user = user.toObject()
    delete user.password;

    const token = jwt.sign({
      id: user._id
    }, String(process.env.JWT_KEY), { expiresIn: "1d" })

    success(res, { ...user, token })
  } catch (error) {
    next(error)
  }
}

//done