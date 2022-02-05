import express from 'express'
import { verifyToken, verifyTokenAdmin, verifyTokenAndAuthorization } from '../middleware/verifyToken'
import { Product } from '../model/product'
import { User } from '../model/user'
const router = express.Router()


//creatre a product

router.post('/', verifyTokenAdmin, async (req, res) => {
  const newProduct = new Product(req.body)
  try {
    const savedProduct = await newProduct.save();
    res.status(200).send(savedProduct)
  } catch (error) {
    res.status(500).send(error)
  }

})


//Update a product
router.put('/:id', verifyTokenAdmin, async (req, res) => {

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
)

//delete a product
router.delete('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    const removedProduct = await Product.findByIdAndDelete(req.params.id)
    res.status(201).send(`Deleted product ${removedProduct}`)
  } catch (error) {
    res.status(500).send(error)
  }
})

//get a user
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(201).send(product)
  } catch (error) {
    res.status(500).send(error)
  }
})

//get sorted products
router.get('/find', async (req, res) => {
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
})











export default router