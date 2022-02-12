import { IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { BaseDtoGroup, BasePagingDto } from "./common.dto";

export class ProductDtoGroup extends BaseDtoGroup { }

export class ProductDto {
  @IsString({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  @IsNotEmpty({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  title: string;

  @IsString({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  @IsNotEmpty({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  desc: string;

  @IsString({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  img: string;

  @IsString({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  categoryId: string;

  @IsString({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  color: string;

  @IsNumberString({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  @IsNotEmpty({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  price: number;
}

export class ProductGetDto extends BasePagingDto {
  @IsOptional({
    groups: [ProductDtoGroup.GET_PAGING, ProductDtoGroup.CHOOSE]
  })
  @IsMongoId({
    groups: [ProductDtoGroup.GET_PAGING, ProductDtoGroup.CHOOSE]
  })
  categoryId: string;
}