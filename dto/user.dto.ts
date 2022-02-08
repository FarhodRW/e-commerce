import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator'
import 'reflect-metadata'
import { BaseDtoGroup, BasePagingDto } from './common.dto';

export class UserDroGroup extends BaseDtoGroup {
  static LOGIN = 'login'
  static VERIFY = 'verify'
  static REGISTER = 'register'
}

export class UserDto {
  @IsOptional({
    groups: [UserDroGroup.UPDATE]
  })
  @IsString({
    groups: [UserDroGroup.REGISTER, UserDroGroup.UPDATE]
  })
  @MinLength(2, {
    groups: [UserDroGroup.REGISTER, UserDroGroup.UPDATE]
  })
  fullName: string;

  @IsString({
    groups: [UserDroGroup.REGISTER]
  })
  email: string;

  @IsString({
    groups: [UserDroGroup.REGISTER, UserDroGroup.LOGIN]
  })
  username: string;

  @IsOptional({
    groups: [UserDroGroup.UPDATE]
  })
  @IsString({
    groups: [UserDroGroup.REGISTER, UserDroGroup.UPDATE, UserDroGroup.LOGIN]
  })
  @MinLength(3, {
    groups: [UserDroGroup.REGISTER, UserDroGroup.UPDATE]
  })
  password: string;

  @IsOptional({
    groups: [UserDroGroup.REGISTER, UserDroGroup.UPDATE]
  })
  @IsBoolean({
    groups: [UserDroGroup.REGISTER, UserDroGroup.UPDATE]
  })
  isAdmin: boolean;
}

export class UserGetDto extends BasePagingDto {

}