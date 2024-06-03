//defines a redux slice for managing the shopping cart state in the client-side application. It includes reducer functions for adding items to the cart ot removing items from the cart
import {createSlice} from "@reduxjs/toolkit";
import {updateCart} from '../utils/cartUtils';

//if there is any existing cart data stored in the browser's memory, it uses that. Otherwise it sets the initial state to an empty cart
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: [], shippingAddress: {}, paymentMethod : 'PayPal'};

//creates a slice of the reddux state spesifically for managing the cart. (Like a small part of the overall data store dedicated to handling cart-related information)
const cartSlice = createSlice({
    name : 'cart',
    initialState,

    reducers: {
        //add product to the cart, if product already in cart, it updates its quantity. If it is a new product it adds it to the cart
        //state represents current state of the shopping cart
        //action is an object containing information about the action dispatched to the reducer
        addToCart: (state,action) => {
            //extracts the payload from the action object. In redux, the payoad usually contains the data needed to update the state.
            const item = action.payload;

            //it checks if the item being added already exists in the cart by searching through the 'cartItems' array in the state.
            //if existItem is not null, it means the item already exists in the cart
            const existItem = state.cartItems.find((x) => x._id === item._id);


            if (existItem)
                {
                    //if item is already in the cart it gets appended to the existing cart and the num of item gets updated
                    state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);

                }
                else
                {
                    //if item is not in the cart it gets appended to the existing cart
                    state.cartItems = [...state.cartItems, item];
                }

                //return updated state
                return updateCart(state);
                
        },
        //removes product from cart
        removeFromCart: (state,action) => {
        state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

        return updateCart(state);
    },
    saveShippingAddress: (state,action) => {
        state.shippingAddress = action.payload;
        return updateCart(state);
    },

    savePaymentMethod: (state, action) => {
        state.paymentMethod = action.payload;
        return updateCart(state);
    },

    clearCartItems : (state,action) => {
        state.cartItems = [];
        return updateCart(state);
    }
},
});

//export so that it can be used by other modules
export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;