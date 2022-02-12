import { ErrorCodes, UserDefinedError } from "../../common/common.error";

export class ReviewError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.REVIEWS, 'Review with this details not found', data)
  }
}