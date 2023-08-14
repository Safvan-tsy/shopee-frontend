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
import { SellerRoute } from './components/route/SellerRoute';
import { PrivateRoute } from './components/route/UserRoute';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/user/ShippingScreen';
import PaymentScreen from './screens/user/PaymentScreen';
import PlaceOrderScreen from './screens/user/PlaceOrderScreen';
import OrderScreen from './screens/user/OrderScreen';
import ProfileScreen from './screens/user/ProfileScreen';
import RegistrationScreen from './screens/seller/RegistrationScreen';
import { AdminRoute } from './components/route/AdminRoute';
import DashboardScreen from './screens/seller/DashboardScreen';
import SettingsScreen from './screens/seller/SettingsScreen';
import WalletScreen from './screens/seller/WalletScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import PaymentsScreen from './screens/seller/PaymentsScreen';
import ProductsScreen from './screens/seller/ProductsScreen';
import OrdersScreen from './screens/seller/OrdersScreen';

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
      <Route path='/cart' element={<CartScreen />} />

      <Route path='' element={<PrivateRoute />} >
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/seller/register' element={<RegistrationScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/productlist/:page' element={<ProductListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>

      <Route path='' element={<SellerRoute />}>
        <Route path='/seller/dashboard' element={<DashboardScreen />} />
        <Route path='/seller/wallet' element={<WalletScreen />} />
        <Route path='/seller/orders' element={<OrdersScreen />} />
        <Route path='/seller/products' element={<ProductsScreen />} />
        <Route path='/seller/payments' element={<PaymentsScreen />} />
        <Route path='/seller/settings' element={<SettingsScreen />} />
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
