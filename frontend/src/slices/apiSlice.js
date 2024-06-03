import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../constants';

//baseQuery will be used as the foundation for all API requests, ensuring they are sent to the correct URL.
const baseQuery = fetchBaseQuery({baseUrl: BASE_URL });

//creates a API slice using the 'createAPI'
export const apiSlice = createApi({
    //spesifies the base query configuration to be used for making API requests
    baseQuery,
    //defines tag types for categorizing API data. These tags can be used to manage and cache API responses
    tagTypes: ['Product', 'Order', 'User'],
    //defines endpoints for making API requests, 
    endpoints: (builder) => ({})
});

/* API: An API (Application Programming Interface) - It's a set of rules and protocols that allows different software applications to communicate with each other. 
In this case, our API will allow our frontend (the part of our application that users interact with) to send requests for data to our backend (the part of our 
application that manages data and logic), and receive responses back.

Endpoint: Each endpoint represents a different operation that our API can perform, such as retrieving a list of products, creating a new user, or updating 
an existing order. When we make a request to a specific endpoint, we're asking the API to perform a specific action.

BaseQuery: The baseQuery is like the default instructions given to the waiter before they take our order. It tells our application how to communicate 
with the server by providing details like the base URL of the API. It's a foundational part of our API setup that ensures all requests are made correctly 
*/