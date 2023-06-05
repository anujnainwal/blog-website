import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Error404 from "../components/notFound/Error404";
import Register from "../auth/register/Register";
import Login from "../auth/login/Login";
import ForgetPassword from "../auth/forget/ForgetPassword";

const MainRouter = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </React.Fragment>
  );
};

export default MainRouter;
