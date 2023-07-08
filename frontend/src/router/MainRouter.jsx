import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";

import Register from "../auth/register/Register";
import Login from "../auth/login/Login";
import ForgetPassword from "../auth/forget/ForgetPassword";
import CreateCategories from "../pages/category/CreateCategories";

const MainRouter = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/*" element={<>sdsd</>} />
        <Route path="/createCategory" element={<CreateCategories />}></Route>
      </Routes>
    </React.Fragment>
  );
};

export default MainRouter;
