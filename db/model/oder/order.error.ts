import { ErrorCodes, UserDefinedError } from "../../common/common.error";

export class OrderError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.ORDERS, 'Order with this details not found', data)
  }

  static AlreadyExists(data: any = null) {
    return new UserDefinedError(ErrorCodes.ORDERS + 1, 'Order with this details already exists', data);
  };

}
