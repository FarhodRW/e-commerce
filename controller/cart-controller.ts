import { Cart } from '../db/model/cart/cart.model'

export async function createCart(req: any, res: any) {

  const newCart = new Cart(req.body)
  try {
    const savedCart = await newCart.save();
    res.status(200).send(savedCart)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function updateCart(req: any, res: any) {
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

export async function deleteCart(req: any, res: any) {
  try {
    const removedCart = await Cart.findByIdAndDelete(req.params.id)
    res.status(201).send(`Deleted product ${removedCart}`)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function getCart(req: any, res: any) {
  try {
    const cart = await Cart.findOne({ UserId: req.params.UserId })
    res.status(201).send(cart)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function getAllCarts(req: any, res: any) {
  try {
    const carts = await Cart.find()
    res.status(200).send(carts)
  } catch (error) {
    res.status(500).send(error)
  }
}