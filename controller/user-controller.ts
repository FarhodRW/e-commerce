import bcrypt from 'bcrypt'
import { validateIt } from '../middleware/validation'
import { UserDtoGroup, UserDto, UserGetDto } from '../dto/user.dto'
import { deleteUserById, getUserByUserNameService, getUsersService, getUserStatsService, updateUserService } from '../service/user.service'
import { success } from '../middleware/methods'

export async function updateUserController(req: any, res: any, next) {
  try {
    const _id = req.user._id
    const dto = await validateIt(req.body, UserDto, 'update')
    if (dto.password)
      dto.password = await bcrypt.hash(req.body.password, 8)

    const updatedUser = await updateUserService(_id, dto)
    success(res, updatedUser)
  } catch (error) {
    next(error)
  }
}

export async function deleteUserController(req: any, res: any, next) {
  try {
    const _id = req.user.id
    const removedUser = await deleteUserById(_id)
    success(res)
  } catch (error) {
    next(error)
  }
}

export async function getUserController(req: any, res: any, next) {
  try {
    const username = req.params.username
    const user = await getUserByUserNameService(username)

    success(res, user)
  } catch (error) {
    next(error)
  }
}

export async function getAllUsersController(req: any, res: any, next) {

  try {
    console.log(req.query)
    const data = await validateIt(req.query, UserGetDto, UserDtoGroup.GET_PAGING)
    console.log(data)
    const response = await getUsersService(data)
    success(res, response)
  } catch (error) {
    next(error)
  }
}

export async function getUserStatsController(req: any, res: any, next) {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
  try {
    const data = await getUserStatsService(lastYear)
    success(res, data)
  } catch (error) {
    next(error)
  }
}


//almost done