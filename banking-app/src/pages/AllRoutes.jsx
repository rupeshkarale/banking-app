import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Transactions from "./Transaction";
import { ChakraProvider, CSSReset, Box } from "@chakra-ui/react";
import AllTransaction from "./AllTransaction";
import CustomerTransaction from "./CustomerTransaction";
const AllRoutes = () => {
  return (
    // <Box maxW="600px" mx="auto" border="1px" padding="10">
    // <CSSReset />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route
        path="/accountpage"
        element={
          
            <Accountpage />
         
        }
      /> */}
      <Route path="/transaction" element={<Transactions />} />
      <Route path="/allTransaction" element={<AllTransaction />} />
      <Route path="/allTransaction/:userId" element={<CustomerTransaction />} />
      {/* <Route path="/transection" element={<Transactions />} /> */}
      {/* <Route
        path="/singleuser/:id"
        element={
          
            <SingleUser />
         
        }
      /> */}
    </Routes>
    // </Box>
  );
};

export default AllRoutes;
