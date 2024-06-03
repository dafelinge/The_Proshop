import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import {Provider} from 'react-redux';
import store from './store';
import './assets/index.css';
import './assets/bootstrap.custom.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import ShippingScreen from  './screens/Shipping';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminRoute from './components/AdminRoute';
import OrderListScreen from './screens/admin/OrderListScreen';

//manages the navigation and URL synchronization using the browser's history API
const router = createBrowserRouter(
//converts react elements (JSX) into route config objects, which the router uses to math URLs and render the correct components
  createRoutesFromElements(
    //defines a path and the component that should be rendered when the URL matches this path
    <Route path = '/' element={<App />}>
      <Route index = {true} path = '/' element={<HomeScreen />} />
      <Route path = '/product/:id' element={<ProductScreen />} />
      <Route path = '/cart' element={<CartScreen />} />
      <Route path = '/login' element={<LoginScreen />} />
      <Route path = '/register' element={<RegisterScreen />} />

      <Route path = '' element= {<PrivateRoute />} > 
      <Route path = '/shipping' element={<ShippingScreen />} />
      <Route path = '/payment' element={<PaymentScreen />} />
      <Route path = '/placeorder' element={<PlaceOrderScreen />} />
      <Route path = '/order/:id' element={<OrderScreen />} />
      <Route path = '/profile' element={<ProfileScreen />} />
      </Route>

      <Route path = '' element= {<AdminRoute />} > 
      <Route path = '/admin/orderList' element={<OrderListScreen />} />
      </Route>

    </Route>
  )


);
//creates a root to manage a react tree
//grabs the DOM element with the ID of 'root' to mount the React application
//Starting Point: Just like you need a baseplate to start building Legos, your React app needs a starting point in the HTML to build and show your web application.
//Once you have your base ready with const root = ReactDOM.createRoot(document.getElementById('root'));, you can start putting pieces (your React components) together
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//Wrapper component that helps identify potential problems in a application
  <React.StrictMode>
    <Provider store = {store}>
      <PayPalScriptProvider deferLoading = {true} >
        <RouterProvider router={router}/>
      </PayPalScriptProvider>
      
    </Provider>  
  </React.StrictMode>
);
//Provider - makes the redux store available to any nested components that need access to the Redux store
//RouterProvider - Provides the routing context to the rest of the application


reportWebVitals();
