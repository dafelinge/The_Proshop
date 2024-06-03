import mongoose from "mongoose";

//this schema defines the structure of a review for a product
const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "User",
    },
    name: {
        type: String,
        required: true,
    },
    rating :{
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
},
    {timestamps: true,}
);

//this schema defines the structure of a product
const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "User",
    },
    name: {
        type : String,
        required : true,
    },
    image :{
        type : String,
        required : true,
    },
    brand: {
        type : String,
        required : true,
    },
    category: {
       type : String,
       required : true, 
    },
    description: {
        type : String,
        required : true,
    },
    reviews: [reviewSchema],
    rating: {
        type : Number,
        required : true,
        default : 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required : true,
        default : 0
    },
    countInStock: {
        type: Number,
        required: true,
        default : 0,
    }
    },
    {timestamps : true},
);  

//product model is created using mongoose.model(), passing in the schema definition for 'productSchema'. This model will be used to interact with the MongoDB database collection associated with products.
const Product = mongoose.model("Product", productSchema);

export default Product;