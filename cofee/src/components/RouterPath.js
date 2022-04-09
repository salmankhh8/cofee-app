import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navitem from "./Navitem";
import Login from "./Signup/Login";
import Register from "./Signup/Register";
import Profile from "./uploads/Profile";
import Product from "./Products/products";
import EditProfile from "./uploads/editProfile";
import DsiplayProduct from "./Products/DsiplayProduct";
import LoaderSkeleton from "./loader/LoaderSkeleton";
import ShowSelectedProducts from "./Products/ShowSelectedProducts";
import AddToCart from "./Products/addToCart";

const RouterPath = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navitem />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<DsiplayProduct />} />
            <Route path="/add_products" element={<Product />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/loader" element={<LoaderSkeleton />} />
            <Route path="/selecteditem/:_id" element={<ShowSelectedProducts />} />
            <Route path="/addTocart/:_id" element={<AddToCart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterPath;
