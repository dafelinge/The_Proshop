import {apiSlice} from './apiSlice';
import {ORDERS_URL, PAYPAL_URL} from '../constants';
//import { getMyOrders } from 'backend\controllers\orderController.js';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder : builder.mutation({
           query : (order) => ({
            url : ORDERS_URL,
            method : 'POST',
            body : {...order}, 
            //credentials: "include",
        })
    }),
    getOrderDetails : builder.query ({
       query : (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`
       }),
       keepUnusedDataFor : 5,
    }),
        payOrder : builder.mutation({
            query : ({orderId, details}) => ({
                url : `${ORDERS_URL}/${orderId}/pay`,
                method : 'PUT',
                body : {...details},
            }),
        }),

        getPayPalClientId : builder.query({ 
           query : () => ({
            url : PAYPAL_URL,
           }),
            keepUnusedDataFor : 5,
        }),

        getMyOrders : builder.query({
            query : () => ({
                url : `${ORDERS_URL}/mine`,
            }),  
        keepUnusedDataFor : 5,
        }),

        getOrders : builder.query({
            query : () => ({
                url : ORDERS_URL,
            }),
            keepUnusedDataFor : 5,
        })
  }),
 });

export const {useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useGetMyOrdersQuery, useGetOrdersQuery} = ordersApiSlice;
