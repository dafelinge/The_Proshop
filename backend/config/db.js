//This file establishes a connection to the MongoDB server using mongoose (MongoDB object modeling tool)
//import mongoose library
import mongoose from 'mongoose';    

//defines a asyncronous function (connectDB) (convention in Node.js to use async funcs when dealing with I/O operations)
const connectDB = async () => { 
//TRY to establish a connection to the MongoDB database, CATCH error message
    try {
    //attempt to connect to the MongoDB database   
    const conn = await mongoose.connect(process.env.MONGO_URI);
    //message to alert that MongoDB is connected
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    //if MongoDB connection is unsuccessful
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }


};

export default connectDB;


