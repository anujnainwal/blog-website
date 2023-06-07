import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Error404 from "../components/notFound/Error404";
import Register from "../auth/register/Register";
import Login from "../auth/login/Login";
import ForgetPassword from "../auth/forget/ForgetPassword";
import ProtectedRoute from "./ProtectedRoute";
import CreateCategories from "../pages/category/CreateCategories";
import CategoryList from "../pages/category/CategoryList";

const MainRouter = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/createCategories" element={<CreateCategories />} />
          <Route path="/categoryList" element={<CategoryList />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </React.Fragment>
  );
};

export default MainRouter;
