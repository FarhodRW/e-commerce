import { UserDefinedError } from "../db/common/common.error";
import { CategoryError } from "../db/model/category/category.error";
import { Category } from "../db/model/category/category.model";
import { CategoryDto } from "../dto/category.dto";

export async function createCategoryService(dto: CategoryDto) {
  try {
    const category = new Category(dto);
    await category.save()
    return category
  } catch (error: any) {
    if (error.code == 11000) {
      throw CategoryError.AlreadyExists(Object.getOwnPropertyNames(error.keyPattern));
    }
    throw UserDefinedError.UnknownError(error);
  }
}

export async function updateCategoryService(dto: CategoryDto, _id) {
  const updatedCategory = await Category.findByIdAndUpdate(_id,
    {
      $set: dto
    }, { new: true }
  )
  return updatedCategory
}

export async function getCategoryByIdService(_id: CategoryDto) {
  const category = Category.findById(_id)
  if (!category) throw CategoryError.NotFound(_id)
  return category
}

export async function deleteCategoryByIdService(_id: CategoryDto) {
  const category = Category.findByIdAndDelete(_id)
  return category
}