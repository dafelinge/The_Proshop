//
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc Create new order
// @route POST /api/orders
// @access Private

//async function that creates all orders
//uses asyncHandler to handle any async error that might occur during execution of function
const addOrderitems = asyncHandler(async (req,res) => {
    //awaits the result of Order.find({}) which retrieves all orders from the database
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
      const order = new Order({
        orderItems : orderItems.map((x) => ({
            ...x,
            product: x._id,
            _id : undefined
        })),
        user : req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
//async function that fetches all orders
//uses asyncHandler to handle any async error that might occur during execution of function
const getMyOrders = asyncHandler(async (req,res) => {
    //awaits the result of Order.find({}) which retrieves all orders from the database
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
    
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
//async function that get order by ID
//uses asyncHandler to handle any async error that might occur during execution of function
const getOrderById = asyncHandler(async (req,res) => {
    //awaits the result of Order.find({}) which retrieves all orders from the database
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order)
        {
         res.status(200).json(order);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
//async function that fetches all products
//uses asyncHandler to handle any async error that might occur during execution of function
const updateOrderToPaid = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id : req.body.id,
            status : req.body.status,
            update_time: req.body.update_time,
            email_address : req.body.email_address,
        };

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } else {
       res.status(404);
       throw new Error('Order not found') 
    }
    
    
});

// @desc Update order to delivered
// @route PUT /api/orders/:id/delivery
// @access Private/Admin
//async function that fetches all products
//uses asyncHandler to handle any async error that might occur during execution of function
const updateOrderToDelivered = asyncHandler(async (req,res) => {
    //awaits the result of Order.find({}) which retrieves all orders from the database
    res.send('update order to delivered');
    
});

// @desc get all orders
// @route GET /api/orders
// @access Private/Admin
//async function that fetches all products
//uses asyncHandler to handle any async error that might occur during execution of function
const getOrders = asyncHandler(async (req,res) => {
    //awaits the result of Order.find({}) which retrieves all orders from the database
    const orders = await Order.find({}).populate('user','id name');
    res.status(200).json(orders);
});

export {
    addOrderitems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
};