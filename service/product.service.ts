import { error } from "console";
import { Collection, Types } from "mongoose";
import { CollectionNames } from "../db/common/common.model";
import { ProductError } from "../db/model/product/product.error";
import { Product } from "../db/model/product/product.model";
import { UserError } from "../db/model/user/user.error";
import { ProductDto, ProductGetDto } from "../dto/product.dto";


export async function createProductService(dto: ProductDto) {
  try {
    const product = new Product(dto);

    await product.save();

    return product;
  } catch (e: any) {
    console.log(e.code)
    if (e.code == 11000) {
      throw ProductError.AlreadyExists(Object.getOwnPropertyNames(e.keyPattern));
    }
    console.log(e)
  }
}


export async function updateProductService(dto: ProductDto) {
  const updatedProduct = await Product.findByIdAndUpdate(dto,
    {
      $set: dto
    }, { new: true }
  )
  return updatedProduct
}

export async function getProductByIdService(_id: string, is_deleted: boolean = false) {
  const query = {
    _id
  }

  const product = await Product.findById(query)

  if (!product || product.is_deleted && !is_deleted) throw UserError.NotFound(_id)

  return product;
}

export async function deleteProductByIdService(_id: string) {
  const query = {
    _id
  }
  const removedProduct = await Product.findByIdAndDelete(_id)
  return removedProduct
}


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

