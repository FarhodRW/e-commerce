import { CategoryDto } from '../dto/category.dto';
import { BaseDtoGroup } from '../dto/common.dto';
import { success } from '../middleware/methods';
import { validateIt } from '../middleware/validation';
import {
  createCategoryService,
  deleteCategoryByIdService,
  getCategoryByIdService,
  updateCategoryService
} from '../service/category.service';


export async function createCategoryController(req: any, res: any, next) {

  try {

    const dto = await validateIt(req.body, CategoryDto, BaseDtoGroup.CREATE)
    const category = await createCategoryService(dto)
    success(res, category)
  } catch (error) {
    next(error)
  }
}


export async function updateCategoryController(req, res: any, next) {

  try {
    const _id = req.params.id
    const dto = await validateIt(req.body, CategoryDto, BaseDtoGroup.UPDATE)
    const updatedCategory = await updateCategoryService(dto, _id)
    success(res, updatedCategory)
  } catch (error) {
    next(error)
  }
}

export async function getCategoryByIdController(req: any, res: any, next) {
  try {
    const _id = req.params.id
    const category = await getCategoryByIdService(_id)
    success(res, category)
  } catch (error) {
    next(error)
  }
}

export async function deleteCategoryByIdController(req: any, res: any, next) {
  try {
    const _id = req.params.id
    const category = await deleteCategoryByIdService(_id)
    success(res)
  } catch (error) {
    next(error)
  }
}


