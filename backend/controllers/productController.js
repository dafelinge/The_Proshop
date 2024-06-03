//
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc fetch all products
// @route GET /api/products
// @access Public

//async function that fetches all products
//uses asyncHandler to handle any async error that might occur during execution of function
const getProducts = asyncHandler(async (req,res) => {
    //awaits the result of Product.find({}) which retrieves all products from the database
    const products = await Product.find({});
    //once the products are retrieved, it sends them back to client as a JSON response
    //The products variable contains the products retreived from the database. Express automatically 
    //converts this JS obj into JSON format before sending it as the response

    res.json(products);
});

// @desc fetch a products
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);

    if (product)
        {
            return res.json(product);
        }
        else{
            res.status(404);
            throw new Error('Resource not found');
        }
});

export {getProducts, getProductById};

//JSON
    //Effiecient
    //Human-Readable
    //Widely Supported
    //Ease of Parsing
