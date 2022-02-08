import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { UserDefinedError } from '../db/common/common.error';

export async function validateIt<T>(body, classType: ClassConstructor<T>, groups) {
  try {
    const data = plainToClass(classType, body, { excludeExtraneousValues: false });
    await validateOrReject(data as any, { groups, whitelist: true })
    return data;
  } catch (errors: any) {
    let errorMessage: any[] = []
    for (const error of errors) {
      Object.keys(error.constraints).forEach(key => {
        errorMessage.push({
          field: error.property,
          message: error.constraints[key]
        })
      })
    }
    throw UserDefinedError.ValidationError(errorMessage);
  }
}

