import express from 'express'
import { verifyToken, verifyTokenAdmin, verifyTokenAndAuthorization } from '../middleware/verifyToken'
import { Cart } from '../model/cart'
import { Product } from '../model/product'
import { User } from '../model/user'
const router = express.Router()


//create a cart

router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body)
  try {
    const savedCart = await newCart.save();
    res.status(200).send(newCart)
  } catch (error) {
    res.status(500).send(error)
  }

})


//Update a cart
router.put('/:id', verifyToken, async (req, res) => {

  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
      {
        $set: req.body
      }, { new: true }
    )
    res.status(201).json(updatedCart)
  } catch (error) {
    res.status(500).json(error)
  }
}
)

//delete a cart
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const removedCart = await Cart.findByIdAndDelete(req.params.id)
    res.status(201).send(`Deleted product ${removedCart}`)
  } catch (error) {
    res.status(500).send(error)
  }
})

//get a cart
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(201).send(product)
  } catch (error) {
    res.status(500).send(error)
  }
})

// //get sorted products
// router.get('/find', async (req, res) => {
//   const qNew = req.query.new
//   const qCategory = req.query.category

//   try {
//     let products
//     if (qNew) {
//       products = await Product.find().sort({ createdAt: -1 })
//     }
//     else if (qCategory) {
//       products = await Product.find({
//         categories: {
//           $in: [qCategory]
//         }
//       })
//     }
//     else products = await Product.find()
//     res.status(201).send(products)
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })











export default router