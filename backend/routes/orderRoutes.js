import express from 'express';
//creates a new router object
//routers are used to group related routes and middleware, allowing for better organization of code.
const router = express.Router();
import { addOrderitems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
} from '../controllers/orderController.js';
import {protect, admin} from '../middleware/authMiddleware.js';
//import asyncHandler from "../middleware/asyncHandler.js";

//line of code defines a route for handling HTTP GET requests to root endpoint ('/api/orders)
//when a client makes a GET request to this endpoint, it means they want to retrieve all orders
//the getOrders function from the controller is associated with this route. It is responsible for fetching and returning all orders in the database.
router.route('/').post(protect, addOrderitems).get(protect, admin, getOrders);

router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);



//exports the router object, making it available for use in other parts of the application
export default router;