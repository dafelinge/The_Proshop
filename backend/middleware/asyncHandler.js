//contains middleware functions to help handle errors in Express.
//higher order function that takes another function (fn) in as parameter
//returned middleware function takes three parameters ( req=> request object) (res=> response object) (next => callback function to pass control to the next middleware)
const asyncHandler = (fn) => (req, res, next) => {
    //Promise.resolve makes sure our task (fn) behaves preditably
    //.catch() gets chained to the resolved promise. If any errors occur when executing fn, error will be caught and passed to next middleware
    Promise.resolve(fn(req, res, next)).catch(next);

}

//export making it available for use in other parts of the application
export default asyncHandler;

//request object includes: (server uses req object to understand what client wants and how to prepare a response)
    //URL client wants to access
    //data client is sending (inputs or JSON data)
    //info about client (IP address/ type of browser it is using)

//response object includes: ( res obj contains info or content you requested, like web page you want to see)
    //Content client requested
    //HTTP headers
