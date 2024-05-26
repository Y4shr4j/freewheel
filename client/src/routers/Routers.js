import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";

import Fleet from "../pages/fleet";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import ProductDetails from "../pages/productDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Add from "../pages/Add";
import AddBlog from "../pages/AddBlog";
import Privacy from "../pages/privacy";
import Dashboard from "../pages/user/dashboard";
import Orders from "../pages/user/Orders";
import Profile from "../pages/user/Profile";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import PrivateRoute from "../components/Routes/Private";
import AdminRoute from "../components/Routes/AdminRoute";
import CreateCategory from "../pages/Admin/CreateCatogory";
import CreateProduct from "../pages/Admin/CreateProduct";
import UpdateProduct from "../pages/Admin/UpdateProduct";
import Search from "../pages/search";
import Products from "../pages/Admin/Products";
import Users from "../pages/Admin/Users";
import AdminOrders from "../pages/Admin/AdminOrders";
import CartPage from "../pages/CartPage";
import Blogs from "../pages/Admin/Blogs";
import Comments from "../pages/Admin/AdminMessages";



const Routers = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/search" element={<Search/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/fleet" element={<Fleet />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/add" element={<Add />} />
      <Route path="/addblog" element={<AddBlog />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/blog/:slug" element={<BlogDetails />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path ="user" element={<Dashboard/>}/>
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>
      
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path ="admin" element={<AdminDashboard/>}/>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/product/:slug" element={<UpdateProduct />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/blogs" element={<Blogs />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/comments" element={<Comments />} />
        <Route path="admin/orders" element={<AdminOrders />} />
      </Route>
    </Routes>
    
  );
};

export default Routers;
