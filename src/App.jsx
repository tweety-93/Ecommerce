import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Saved from './components/Saved';
import Home from './components/Home'
import Cart from './components/Cart';
import ProductItem from './components/ProductItem'
import CheckOut from './components/CheckOut'
import Payment from './components/Payment'
import Cancel from './components/Cancel'


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductItem />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </div>
  );
}

export default App

//