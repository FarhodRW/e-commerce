import { Transform } from "class-transformer";
import { IsNumber, isNumberString, IsOptional, IsString } from "class-validator";

export class BaseDtoGroup {
  static CREATE = 'create'
  static UPDATE = 'update'
  static GET_PAGING = 'get-paging'
  static CHOOSE = 'choose'
}

export class BasePagingDto {
  @Transform(({ value }) => isNumberString(value) ? Number(value) : value)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false
  }, {
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  page: number;

  @Transform(({ value }) => isNumberString(value) ? Number(value) : value)
  @IsNumber({
    allowInfinity: false,
    allowNaN: false
  }, {
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  limit: number;

  @IsOptional({
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  @IsString({
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  search: string;
}