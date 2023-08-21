import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Transactions from "./Transaction";
import AllTransaction from "./AllTransaction";
import CustomerTransaction from "./CustomerTransaction";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/transaction" element={<Transactions />} />
      <Route path="/allTransaction" element={<AllTransaction />} />
      <Route path="/allTransaction/:userId" element={<CustomerTransaction />} />
    </Routes>
  );
};

export default AllRoutes;
