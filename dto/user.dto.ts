import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator'
import 'reflect-metadata'
import { BaseDtoGroup, BasePagingDto } from './common.dto';

export class UserDtoGroup extends BaseDtoGroup {
  static LOGIN = 'login'
  static VERIFY = 'verify'
  static REGISTER = 'register'
}

export class UserQueryDto {

}
export class UserDto {
  @IsOptional({
    groups: [UserDtoGroup.UPDATE]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  @MinLength(2, {
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  fullName: string;

  @IsString({ groups: [UserDtoGroup.REGISTER] })
  email: string;

  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.LOGIN]
  })
  username: string;

  @IsOptional({
    groups: [UserDtoGroup.UPDATE]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE, UserDtoGroup.LOGIN]
  })
  @MinLength(3, {
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  password: string;

  @IsOptional({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  isAdmin: boolean;
}

export class UserGetDto extends BasePagingDto {

}