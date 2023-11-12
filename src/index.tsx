import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductScreen from './screens/ProductScreen';
import { PrivateRoute } from './components/route/UserRoute';
import CartScreen from './screens/user/CartScreen';
import ShippingScreen from './screens/user/ShippingScreen';
import OrderScreen from './screens/user/OrderScreen';
import ProfileScreen from './screens/user/ProfileScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import NotFoundScreen from './screens/NotFoundScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:page' element={<HomeScreen />} />
      <Route path='/search/:keyword/page/:page' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />} >
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/seller/register' element={<RegistrationScreen />} />
        <Route path='/cart' element={<CartScreen />} />
        <Route path='/orders' element={<OrderScreen />} />
      </Route>


      <Route path="*" element={<NotFoundScreen />} />

    </Route>
  )
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();
