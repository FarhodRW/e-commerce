import { ErrorCodes, UserDefinedError } from "../../common/common.error";

export class UserError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.USERS, 'User with this details not found', data)
  }

  static AlreadyExists(data: any = null) {
    return new UserDefinedError(ErrorCodes.USERS + 1, 'User with this details already exists', data);
  };

}