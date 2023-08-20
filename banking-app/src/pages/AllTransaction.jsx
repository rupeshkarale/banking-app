import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { url } from "../constants/constatant";
import { useNavigate } from "react-router-dom";

const AllTransaction = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, SetAccessToken] = useState(localStorage.getItem("token"));
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const getTransactions = async () => {
    try {
      const response = await axios.get(`${url}/user/getalluser`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `bearer ${accessToken}`,
        },
      });

      console.log(response.data);
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
      alert("Authentication failed. Please log in again.");
      navigate('/')
    }
  };

  useEffect(() => {
    try {
      getTransactions(accessToken);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  const handleViewTransactions = (customerId) => {
    navigate(`/allTransaction/${customerId}`);
  };

  return (
    <Box p={4} bg="blue.500" color="white" minH="100vh">
      <Heading as="h1" size="xl" mb={4}>
        Accounts Page
      </Heading>
      <Divider mb={4} />
      {loading ? (
        <Spinner size="lg" />
      ) : error ? (
        <Text color="red.500">Error loading customer accounts</Text>
      ) : (
        <Table
          variant="simple"
          color="blackAlpha.900"
          bg="white"
          borderRadius="md"
        >
          <Thead>
            <Tr>
              <Th>Customer Name</Th>
              <Th>Balance</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((account) => (
              <Tr key={account._id}>
                <Td>{account.name}</Td>
                <Td>${account.balance.toFixed(2)}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    onClick={() => handleViewTransactions(account._id)}
                  >
                    View Transactions
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <Divider mt={4} />
      <Text mt={4} fontSize="sm" textAlign="center">
        Footer Text Here
      </Text>
    </Box>
  );
};

export default AllTransaction;
