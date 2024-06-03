import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

//loads environment variables from '.env'
dotenv.config();

//establishes a connection to the MongoDB database by calling the 'connectDB()' function
connectDB();


const importData = async () => {
    try {
        //deletes all existing data fromm the 'Order', 'Product', 'User' collections
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        //inserts the sample users from the 'users' array into the User collection, returns a array of created users
        const createdUsers = await User.insertMany(users);
        //_id of the first user (admin) is extracted from 'createdUsers[0]._id and stored in 'adminUser'
        const adminUser = createdUsers[0]._id;
        //sample products is created by mapping through products array, makes sure that all sample products are associated with the admin user
        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser};
        });

        //inserts the sample products into the 'Product' collection
        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

//deletes all data from the Order, Product and User collections
const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d')
    {
        destroyData();
    }
    else {
        importData();
    }

    //await is used, the function is paused until the promise provided to await is settled.
    //if promise resolves successfully => result of promise is returned
    //if promise rejects => error is thrown