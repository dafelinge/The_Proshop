import express from 'express';
//creates a new router object
//routers are used to group related routes and middleware, allowing for better organization of code.
const router = express.Router();
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser
} from '../controllers/userController.js';
import {protect, admin} from '../middleware/authMiddleware.js';
//import asyncHandler from "../middleware/asyncHandler.js";

//line of code defines a route for handling HTTP GET requests to root endpoint ('/api/products)
//when a client makes a GET request to this endpoint, it means they want to retrieve all products
//the getProducts function from the controller is associated with this route. It is responsible for fetching and returning all products in the database.
router.route('/')
.post(registerUser)
.get(protect, admin, getUsers);

//line of code defines a route for handling HTTP GET requests to root endpoint ('/api/products/:id')
//the :id part in the endpoint URL is a placeholder for specific product ID
//the getProductById function from the controller is associated with this route. It is responsible for fetching and returning a products in the database with the specified product ID.
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile);
router.route('/:id')
.delete(protect, admin, deleteUser)
.get(protect, admin,getUserByID)
.put(protect, admin,updateUser);




//exports the router object, making it available for use in other parts of the application
export default router;