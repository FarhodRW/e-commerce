import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEnum, IsMongoId, IsNumber, IsString, ValidateNested } from "class-validator";
import { ORDER_STATE } from "../db/model/oder/order.model";
import { BaseDtoGroup } from "./common.dto";

export class OrderDtoGroup extends BaseDtoGroup {
  static SET_STATE = 'setstate'
}

export class ProductOrderDto {

  @IsMongoId({
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  productId: string;

  @IsNumber({}, {
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  quantity: number;
}

export class OrderDto {
  @IsString({
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  userId: string;

  @IsString({
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  address: string;

  @IsEnum(ORDER_STATE, {
    groups: [OrderDtoGroup.UPDATE],

  })
  state: ORDER_STATE;

  @IsArray({
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  @Type(() => ProductOrderDto)
  @ArrayMinSize(1, {
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  @ValidateNested({ each: true })
  products: ProductOrderDto[]

  total_price: number;
}