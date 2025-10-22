
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyProducts from './pages/MyProducts';
import BestProducts from './pages/bestProducts';
import CartPage from './pages/cartPage';
import CategoryProducts from './pages/CategoryProducts'
import AddProduct from './pages/addProduct';
import ProductPage from './pages/ProductPage';
import DeleteProductPage from './pages/DeleteProductPage';
import OrdersPage from './pages/OrdersPage';
import AdminMessages from './pages/adminMessage';
const AppRouter = ({cartItems,setCartItems}) => {
  return (
    <Routes>
      <Route path="/" element={<Home  setCartItems={setCartItems}/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<MyProducts cartItems={cartItems} setCartItems={setCartItems}/>}  />
      <Route path="/bestProducts" element={<BestProducts  setCartItems={setCartItems}/>} />
      <Route path="/cart" element={<CartPage  cartItems={cartItems} setCartItems={setCartItems}/>} />
      <Route path="/category/:categoryName" element={<CategoryProducts cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path="/add-Product" element={<AddProduct />} />
      <Route path="/product/:id" element={<ProductPage  setCartItems={setCartItems} />} />
      <Route path="/delete-product" element={<DeleteProductPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/admin/messages" element={<AdminMessages />} />
    </Routes>
  );
};

export default AppRouter;