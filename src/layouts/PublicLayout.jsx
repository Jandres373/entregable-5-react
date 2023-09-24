import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NavBar from "../components/shared/NavBar.jsx"
import Footer from "../components/shared/Footer.jsx"
const PublicLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;