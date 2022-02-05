import { Product } from '../model/product'

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
export async function updateProduct(req: any, res: any) {

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

export async function getSortedProducts(req: any, res: any) {
  const qNew = req.query.new
  const qCategory = req.query.category

  try {
    let products
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 })
    }
    else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory]
        }
      })
    }
    else products = await Product.find()
    res.status(201).send(products)
  } catch (error) {
    res.status(500).send(error)
  }
}