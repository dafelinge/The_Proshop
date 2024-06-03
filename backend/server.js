import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
//loads environment variables from a '.env' file into process.env
dotenv.config();
import connectDB from './config/db.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';

import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import productRoutes from './routes/productRoutes.js';
//retrieves port number from environment variables
const port = process.env.PORT;
//connect to MongoDB
connectDB(); 

//initializes express application
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

//Cookie parser middleware
app.use(cookieParser());


//defines a route for handling GET requests to the root endpoint ('/'). When accessed, it sends a response with the message 'API is running...
app.get('/', (req,res) => {
    res.send('API is running...');
});

//mounts the productRoutes middleware at the '/api/products' endpoint. This means that any requests to routes starting with '/api/products' will be handled by productRoutes
app.use('/api/products',productRoutes);

//mounts the userRoutes middleware at the '/api/users' endpoint. This means that any requests to routes starting with '/api/users' will be handled by userRoutes
app.use('/api/users', userRoutes);

app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => res.send ({clientId: process.env.PAYPAL_CLIENT_ID }));

//mounts the 'notFound' middleware to handle 404 errors and the 'errorHandler' middleware for general error handling
app.use(notFound);
app.use(errorHandler);

//starts the server on the specified port. When the server is successfully started, it logs a message indicating the port number
app.listen(port, () => console.log(`Server running on port ${port}`));
