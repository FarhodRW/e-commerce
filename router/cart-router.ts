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
router.get('/find/:UserId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ UserId: req.params.UserId })
    res.status(201).send(cart)
  } catch (error) {
    res.status(500).send(error)
  }
})

//Get all products(ONLLY admin)
router.get('/carts', verifyTokenAdmin, async (req, res) => {
  try {
    const carts = await Cart.find()
    res.status(200).send(carts)
  } catch (error) {
    res.status(500).send(error)
  }

})











export default router