const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartModel');
const Product = require('../models/productModel');

// get all cart items with total
router.get('/', async (req,res) => {
  try {
    const cartItems = await CartItem.find().populate('productId');
    const total = cartItems.reduce((sum,item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);
    res.json({cartItems, total});
  } catch (error) {
    res.status(500).json({message: 'Error fetching cart', error});
  }
});

// add to cart
router.post('/', async (req,res) => {
  try {
    const { productId, quantity } = req.body; 

    // check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({message: 'Product not found'});
    }

      // check if already in cart
      let cartItem = await CartItem.findOne({productId});
      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        cartItem = new CartItem({ productId, quantity });
        await cartItem.save();

      }

      res.status(201).json(cartItem);
  } catch(error) {
    res.status(500).json({message: 'Error adding to cart',error});
  }
});

// remove from cart
router.delete('/:id', async (req,res) => {
  try {
    const { id } = req.params;
    await CartItem.findByIdAndDelete(id);
    res.json({message: 'Item removed from cart'});
  } catch (error) {
    res.status(500).json({message: 'Error removing item', error});
  }
});

module.exports = router