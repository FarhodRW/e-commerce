import { Product } from '../db/model/product/product.model'
import { BaseDtoGroup } from '../dto/common.dto';
import { ProductDto, ProductDtoGroup, ProductGetDto } from '../dto/product.dto';
import { success } from '../middleware/methods';
import { validateIt } from '../middleware/validation';
import {
  createProductService,
  deleteProductByIdService,
  getProductByIdService,
  getProductsPagingService,
  updateProductService
} from '../service/product.service';

export async function createProductController(req: any, res: any, next) {

  try {
    const dto = await validateIt(req.body, ProductDto, BaseDtoGroup.CREATE)
    const product = await createProductService(dto)
    success(res, product)
  } catch (error) {
    next(error)
  }
}

export async function imgUpload(req: any, res: any, next) {
  try {
    const imgProduct = await Product.findByIdAndUpdate(req.params.id,
      {
        img: req.file.buffer
      }, { new: true }
    )
    success(res, imgProduct)
  } catch (error) {
    next()
  }

}

export async function updateProductController(req, res: any, next) {

  try {
    const dto = await validateIt(req.body, ProductDto, BaseDtoGroup.UPDATE)
    const updatedProduct = await updateProductService(dto)
    success(res, updateProductController)
  } catch (error) {
    next(error)
  }
}

export async function deleteProductController(req: any, res: any, next) {
  try {
    const _id = req.user._id
    const removedProduct = await deleteProductByIdService(_id)
    success(res, removedProduct)
  } catch (error) {
    next()
  }
}

export async function getProductController(req: any, res: any, next) {
  try {
    const _id = req.params.id
    const product = await getProductByIdService(_id)
    success(res, product)
  } catch (error) {
    next()
  }
}

export async function getProductsByPagingController(req, res, next) {
  try {

    const data = await validateIt(req.query, ProductGetDto, ProductDtoGroup.GET_PAGING);

    const products = await getProductsPagingService(data);

    success(res, products)

  } catch (e) {
    next(e)
  }
}



//product nearly done