import { IsMongoId, IsOptional } from "class-validator";
import { BaseDtoGroup, BasePagingDto } from "./common.dto";

export class ProductDtoGroup extends BaseDtoGroup { }

export class ProductGetDto extends BasePagingDto {
  @IsOptional({
    groups: [ProductDtoGroup.GET_PAGING, ProductDtoGroup.CHOOSE]
  })
  @IsMongoId({
    groups: [ProductDtoGroup.GET_PAGING, ProductDtoGroup.CHOOSE]
  })
  categoryId: string;
}