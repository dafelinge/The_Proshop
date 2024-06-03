export const addDecimals = (num) => {
    // Ensure num is a number before proceeding
    if (typeof num !== 'number' || isNaN(num)) {
        throw new Error('The input must be a valid number');
    }
    return (Math.round(num * 100) / 100);
};

/*export const updateCart = (state) => 
    {
        //Calculate items price
        state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
        //Calculate shipping price
        state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
        //calculate tax price
        state.taxPrice = addDecimals(Number((0.25 * state.itemsPrice)));
        //calculate total price
        state.totalPrice = Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice);

        //used to store data in the browsers local storage
        //data is local storage is persistent
        //setItem is used to add a new item to local storage or update a existing item
        //'cart' is the key under which the data will be stored in local storage
        //JSON.stringify is a method that converts a JS obj or val to a JSON string
        //state is a JS object representing the state of a shopping cart
        localStorage.setItem('cart', JSON.stringify(state));

        //It takes the state object, which represents the current state of the shopping cart.
        //Converts this state object into a JSON string using JSON.stringify.
        //Stores this JSON string in the browser's localStorage under the key 'cart'.
         return state;
    }
   */

    export const updateCart = (state) => {
        // Calculate items price
        const itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        state.itemsPrice = addDecimals(itemsPrice);
    
        // Calculate shipping price
        const shippingPrice = state.itemsPrice > 100 ? 0 : 10;
        state.shippingPrice = addDecimals(shippingPrice);
    
        // Calculate tax price
        const taxPrice = 0.25 * state.itemsPrice;
        state.taxPrice = addDecimals(taxPrice);
    
        // Calculate total price
        const totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;
        state.totalPrice = addDecimals(totalPrice);
    
        // Store data in local storage
        localStorage.setItem('cart', JSON.stringify(state));
        
        return state;
    };
    