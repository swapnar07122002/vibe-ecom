const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const CartItem = require('../models/cartModel');

// checkout
router.post('/', async (req,res) => {
  try {
    const { name,email,cartItems } = req.body;

    if(!cartItems || cartItems.length === 0) {
      return res.status(400).json({message: 'Cart is empty'});
    }

    // calculate total
    const total = cartItems.reduce((sum, item) => {
      const price = item.productId.price || 0;
      return sum + price *item.quantity;
    }, 0);

    // save order
    const newOrder = new Order({
      userId: 'mockUser1',
      items: cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      total
    });

    await newOrder.save();

    // clear cart after checkout
    await CartItem.deleteMany({userId: 'mockUser1'})

    // create a fake receipt
    const receipt = {
      name,
      email,
      total,
      timestamp: new Date()
    };

    res.status(200).json({
      message: 'Checkout successful!',
      receipt,
    });
  } catch (error) {
    console.error('Checkout error: ',error);
    res.status(500).json({message: 'something went wrong during checkout'});
  }
});

module.exports = router;