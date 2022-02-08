import { UserDefinedError } from '../db/common/common.error';
import { Product } from '../db/model/product/product.model'
import { ProductDtoGroup, ProductGetDto } from '../dto/product.dto';
import { validateIt } from '../middleware/validation';
import { getProductsPagingService } from '../service/product.service';

export async function createProduct(req: any, res: any) {

  try {
    // if (req.file.buffer) {
    //   req.product.img = req.file.buffer
    // }
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save();
    res.status(200).send(savedProduct)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function imgUpload(req: any, res: any) {
  try {
    const imgProduct = await Product.findByIdAndUpdate(req.params.id,
      {
        img: req.file.buffer
      }, { new: true }
    )
    res.send(imgProduct)
  } catch (error) {
    res.status(400).send(error)
  }

}
export async function updateProduct(req, res: any) {

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
      {
        $set: req.body
      }, { new: true }
    )
    res.status(201).json(updatedProduct)
  } catch (error) {
    res.status(500).json(error)
  }
}

export async function deleteProduct(req: any, res: any) {
  try {
    const product = await Product.findById(req.params.id)
    res.status(201).send(product)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function getProduct(req: any, res: any) {
  try {
    const product = await Product.findById(req.params.id)
    res.status(201).send(product)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function getProductsByPagingController(req, res, next) {
  try {

    const data = await validateIt(req.query, ProductGetDto, ProductDtoGroup.GET_PAGING);

    const products = await getProductsPagingService(data);

    res.status(200).send(UserDefinedError.Success(products))

  } catch (e) {
    next(e)
  }
}


export async function getProductsByCategory(req, res) {
  try {
    const products = await Product.find({ categoryId: req.params.id }).limit(12).sort({ createdAt: -1 })
    res.status(200).send(products)
  } catch (error) {
    res.status(404).send(error)
  }

}


export async function getProductsByQuery(req, res) {
  const qCheap = req.query.cheap
  const qExpesnive = req.query.expensive

  try {
    if (qCheap) {
      const products = await Product.find({ category: req.params.id }).limit(12).sort({ price: -1 })
      return res.status(200).send(products)

    }
    else if (qExpesnive) {
      const products = await Product.find({ category: req.params.id }).limit(12).sort({ price: 1 })
      return res.status(200).send(products)

    }
  } catch (error) {
    res.status(404).send(error)
  }
}

