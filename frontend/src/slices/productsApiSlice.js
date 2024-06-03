//const holds the base URL for the products API endpoint
import {PRODUCTS_URL} from "../constants";
import {apiSlice} from "./apiSlice";

//productsAPISlice is extended API slice where new endpoints are injected into the existing 'APIslice'
//injectEndpoints allows you to add new endpoints to a existing API slice
export const productsApiSlice = apiSlice.injectEndpoints({
//func that takes 'builder' as a argument and returns an object defining the endpoints
    endpoints : (builder) => ({
        //defines a query endpoint
        getProducts : builder.query({
            //spesifies the api endpoint to fetch the list of products. returns an object with the URL
           query: () => ({
            url: PRODUCTS_URL,
            //specifies that the data from the query should be kept in cache for 5secs after it is no longer used
           }), keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            //defines query endpoint to fetch details of a product. it takes 'productID' as a parameter and constructs the URL dynamically
            query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`,
            }),
            ////specifies that the data from the query should be kept in cache for 5secs after it is no longer used
            keepUnusedDataFor: 5,

            }),
    }),
});

export const {useGetProductsQuery, useGetProductDetailsQuery} = productsApiSlice;
