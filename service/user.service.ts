import { UserDto, UserGetDto } from "../dto/user.dto";
import { User } from "../db/model/user/user.model";
import { UserDefinedError } from "../db/common/common.error";
import { UserError } from "../db/model/user/user.error";

export async function createUserService(dto: UserDto) {
  try {
    const user = new User(dto);

    await user.save();

    return user;
  } catch (e: any) {
    console.log(e.code)
    if (e.code == 11000) {
      throw UserError.AlreadyExists(Object.getOwnPropertyNames(e.keyPattern));
    }
    throw UserDefinedError.UnknownError(e);
  }

}

export async function getUserByUserNameService(username: string, is_deleted: boolean = false) {
  const query = {
    username
  }

  const user = await User.findOne(query)

  if (!user || user.is_deleted && !is_deleted) throw UserError.NotFound(username)

  return user;
}

export async function updateUserService(_id: string, dto: UserDto, is_deleted: boolean = false) {
  const user = await await User.findByIdAndUpdate(_id,
    {
      $set: dto
    }, { new: true }
  )
  return user
}

export async function deleteUserByIdService(_id) {
  const removedUser = await User.findByIdAndDelete(_id)
  return removedUser
}

export async function getUsersService(dto: UserGetDto) {

  const { page, limit, search } = dto;

  let $match: any = {
    $match: {}
  }
  if (search) {
    $match.$match.fullName = {
      $regex: search,
      $options: 'i'
    }
  }
  const $skip = {
    $skip: (page - 1) * limit
  }

  const $limit = {
    $limit: limit
  }

  const $project = {
    $project: {
      password: 0
    }
  }

  const $sort = {
    $sort: {
      _id: -1
    }
  }

  const pipeline = [
    $match,
    $skip,
    $limit,
    $sort,
    $project
  ]

  const total = await User.countDocuments($match.$match)
  const data = await User.aggregate(pipeline)
  return {
    total,
    data
  }
}

export async function getUserStatsService(lastYear: Date) {

  const $match = {
    $match: {
      createdAt: {
        $gte: lastYear
      }
    }
  }

  const $project = {
    $project: {
      month: {
        $month: '$createdAt'
      }
    }
  }

  const $group = {
    $group: {
      _id: "$month",
      total: {
        $sum: 1
      }
    }
  }

  const pipeline = [
    $match,
    $project,
    $group
  ]

  const data = await User.aggregate(pipeline)

  return data;
}