import { Collection, Types } from "mongoose";
import { CollectionNames } from "../db/common/common.model";
import { Product } from "../db/model/product/product.model";
import { ProductGetDto } from "../dto/product.dto";


export async function getProductsPagingService(dto: ProductGetDto) {
  const { page, limit, categoryId, search } = dto;

  let $match: any = {
    $match: {
      isDeleted: false
    }
  }

  if (categoryId) {
    $match.$match.categoryId = new Types.ObjectId(categoryId)
  }

  if (search) {
    $match.$match.name = {
      $regex: search,
      $options: 'i'
    }
  }

  const $lookupCategory = {
    $lookup: {
      from: CollectionNames.CATEGORIES,
      localField: 'category_id',
      foreignField: '_id',
      as: 'category'
    }
  }

  const $unwindCategory = {
    $unwind: {
      path: '$category',
      preserveNullAndEmptyArrays: true
    }
  }

  const $skip = {
    $skip: (Number(page) - 1) * limit
  }

  const $limit = {
    $limit: Number(limit)
  }

  const pipeline = [
    $match,
    $lookupCategory,
    $unwindCategory,
    $skip,
    $limit
  ]

  const total = await Product.countDocuments($match.$match);
  const data = await Product.aggregate(pipeline)

  return {
    total,
    data
  }
}