import { ErrorCodes, UserDefinedError } from "../../common/common.error";

export class ProductError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.PRODUCTS, 'Product with this details not found', data)
  }

  static AlreadyExists(data: any = null) {
    return new UserDefinedError(ErrorCodes.PRODUCTS + 1, 'Product with this details already exists', data);
  };

}