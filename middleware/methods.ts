import { UserDefinedError } from "../db/common/common.error";

export async function success(res, data?: any) {
  return res.status(200).send(UserDefinedError.Success(data))
}