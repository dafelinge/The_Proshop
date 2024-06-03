//middleware function takes three parameters ( req=> request object) (res=> response object) (next => callback function to pass control to the next middleware)
//invoked when a route is accessed that does not exist
const notFound = (req, res, next) => {
    //creates a error object with a message indicating that resourse was not found, including URL that was accessed
    const error = new Error(`Not Found - ${req.originalUrl}`);  
    //sets HTTP status code to 404
    res.status(404);
    //passes the error object to next middleware function using next() function
    next(error);
};

//middleware function takes three parameters ( ( err => error type ) (req=> request object) (res=> response object) (next => callback function to pass control to the next middleware)
const errorHandler = (err, req, res, next) => {
    //checks type of error and sets a appropriate error message
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    //Check for Mongoose bad ObjectID
    //if error name is CastError and error kind is 'ObjectID' then it measns the resource was not found
    if (err.name === 'CastError' && err.kind === 'ObjectId')
    {
        message = `Resource not found`;
        statusCode = 404;
    }

    //ensures that client receives a structured JSON response containing relevant information, including error message and stack trace (if in dev mode)
    res.status(statusCode).json({message, stack: process.env.NODE_ENV === 'production' ? '' : err.stack,});
};

export {notFound, errorHandler};


/* Passing the error object to the next middleware function allows for centralized error handling in Express.js applications. Here's why you might want to do this:

Error Handling Chain: Express.js middleware functions are executed in a sequence known as the middleware stack. By passing the error object to the next middleware function, you ensure that subsequent error-handling middleware can handle the error appropriately. This allows for a chain of error handling, where different middleware functions can take different actions based on the type of error.

Centralized Error Handling: By passing the error object to the next middleware, you can consolidate error handling logic in a single location. This promotes cleaner code organization and reduces duplication of error handling logic across different parts of your application.

Custom Error Handling: Passing the error object to the next middleware allows you to define custom error-handling middleware functions that can handle specific types of errors in a specialized manner. For example, you might have middleware to handle database errors, authentication errors, or validation errors separately.

Response Customization: The next middleware function in the chain can further customize the response sent back to the client based on the error object received. This could involve formatting the error message, logging the error for debugging purposes, or sending back a custom error response. */