import { IsNotEmpty, IsString } from "class-validator";
import { BaseDtoGroup, BasePagingDto } from "./common.dto";

export class CategoryDtoGroup extends BaseDtoGroup { }

export class CategoryDto extends BasePagingDto {
  @IsString({ groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE] })
  @IsNotEmpty({ groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE] })
  title: string;
}