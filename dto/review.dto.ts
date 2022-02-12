import { IsMongoId, IsNumber, IsString } from "class-validator";
import { BaseDtoGroup } from "./common.dto";

export class ReviewDtoGroup extends BaseDtoGroup { }

export class ReviewDto {

  @IsMongoId({
    groups: [ReviewDtoGroup.CREATE, ReviewDtoGroup.UPDATE]
  })
  userId: string;

  @IsMongoId({
    groups: [ReviewDtoGroup.CREATE, ReviewDtoGroup.UPDATE]
  })
  productId: string;

  @IsString({ groups: [ReviewDtoGroup.CREATE, ReviewDtoGroup.UPDATE] })
  comment: string

  @IsNumber({}, {
    groups: [ReviewDtoGroup.CREATE, ReviewDtoGroup.UPDATE]
  })
  rating: number;
}
