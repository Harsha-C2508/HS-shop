const express = require('express');
const CartItem = require('../models/CartItem');
const Order = require('../models/Order');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

const mapHomeDeliveryOrder = (order, index) => ({
  id: order._id.toString(),
  no: index + 1,
  cusname: order.shipping.name,
  mobile: order.shipping.mobile,
  pincode: order.shipping.pincode,
  city: order.shipping.city,
  state: order.shipping.state,
  street: order.shipping.street || order.shipping.buildingNo || '',
  status: order.status,
});

const mapShopPickupOrder = (order, index) => ({
  id: order._id.toString(),
  no: index + 1,
  Sname: order.shipping.name,
  Smobile: order.shipping.mobile,
  Spincode: order.shipping.pincode,
  Scity: order.shipping.city,
  Sstate: order.shipping.state,
  Sstatus: order.status,
});

const createOrderFromCart = async (req, res) => {
  try {
    const { deliveryType, shipping, paymentMethod } = req.body;
    const cartItems = await CartItem.find({ user: req.user._id });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({
      user: req.user._id,
      items: cartItems.map((item) => ({
        productId: item.product?.toString(),
        name: item.name,
        price: item.price,
        img: item.img,
        quantity: item.quantity,
      })),
      deliveryType,
      shipping,
      total,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentMethod === 'stripe' ? 'pending' : 'pending',
      status: 'Ordered',
    });

    await CartItem.deleteMany({ user: req.user._id });

    return res.status(201).json({
      id: order._id.toString(),
      orderId: order._id.toString(),
      total: order.total,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create order' });
  }
};

router.post('/', authenticate, async (req, res) => {
  return createOrderFromCart(req, res);
});

router.get('/mine', authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

router.get('/userDetails', authenticate, requireAdmin, async (_req, res) => {
  try {
    const orders = await Order.find({ deliveryType: 'home' }).sort({ createdAt: -1 });
    res.json(orders.map(mapHomeDeliveryOrder));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch delivery orders' });
  }
});

router.get('/userDetailShop', authenticate, requireAdmin, async (_req, res) => {
  try {
    const orders = await Order.find({ deliveryType: 'shop' }).sort({ createdAt: -1 });
    res.json(orders.map(mapShopPickupOrder));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch shop pickup orders' });
  }
});

router.post('/userDetails', authenticate, async (req, res) => {
  req.body.deliveryType = 'home';
  req.body.shipping = {
    name: req.body.name,
    mobile: req.body.mobile,
    pincode: req.body.pincode,
    city: req.body.city,
    state: req.body.state,
    buildingNo: req.body.buldingNo,
    street: req.body.street,
    landmark: req.body.landMark,
  };
  return createOrderFromCart(req, res);
});

router.post('/userDetailShop', authenticate, async (req, res) => {
  req.body.deliveryType = 'shop';
  req.body.shipping = {
    name: req.body.Sname,
    mobile: String(req.body.Smobile),
    pincode: req.body.Spincode,
    city: req.body.Scity,
    state: req.body.Sstate,
  };
  return createOrderFromCart(req, res);
});

router.patch('/userDetails/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

router.patch('/userDetailShop/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.Sstatus },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

module.exports = router;
