import { UserDto } from "../dto/user.dto";
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

// export async function updateUserService(id: string, dto: UserDto, is_deleted: boolean = false) {
//   const user = await User.findById(id);
// }