import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  Button,
  ChakraProvider,
  extendTheme,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import { url } from "../constants/constatant";
import { getSingleProfile } from "../Redux/ProfileReducer/action";
import { useParams } from "react-router-dom";

function CustomerTransaction() {
  const [accessToken, SetAccessToken] = useState(localStorage.getItem("token"));
  const profile = useSelector((store) => store.ProfileReducer.data);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  const getTransactionsByUserId = async (userId) => {
    try {
      const response = await axios.get(
        `${url}/account/gettransection/${userId}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log(response.data);
      setTransactions(response.data);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Authentication failed. Please log in again.");
    }
  };

  useEffect(() => {
    console.log(userId);
    getTransactionsByUserId(userId);
    dispatch(getSingleProfile(accessToken, userId));
  }, [accessToken]);

  // Define your custom theme with dark background, custom fonts, and colors
  const theme = extendTheme({
    config: {
      initialColorMode: "dark", // Set the initial color mode to dark
    },
    fonts: {
      heading: "Poppins, sans-serif",
      body: "Open Sans, sans-serif",
    },
    colors: {
      primary: {
        50: "#e6f7ff",
        100: "#b3e0ff",
        200: "#80ccff",
        300: "#4db8ff",
        400: "#1aa3ff",
        500: "#008ae6",
        600: "#0073cc",
        700: "#0059b3",
        800: "#004080",
        900: "#002d66",
      },
      secondary: {
        50: "#fff2e6",
        100: "#ffddb3",
        200: "#ffcc80",
        300: "#ffbb4d",
        400: "#ffaa1a",
        500: "#e68a00",
        600: "#cc7a00",
        700: "#b36600",
        800: "#804c00",
        900: "#663900",
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Box p={4} bg="primary.800" color="white" minH="100vh">
        <VStack spacing={4} align="flex-start" w="100%">
          <HStack justify="space-between" w="100%">
            <Heading as="h1" size="xl">
              Welcome, {profile.name}!
            </Heading>
            <HStack spacing={4}>
              {profile.balance !== undefined && (
                <Text fontSize="lg" color="gray.300">
                  Balance: ${profile.balance.toFixed(2)}
                </Text>
              )}
              <Button colorScheme="secondary" onClick={() => setMessage("")}>
                Logout
              </Button>
            </HStack>
          </HStack>

          {message && (
            <Alert status="success">
              <AlertIcon />
              {message}
            </Alert>
          )}
          {transactions.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="white">Action Amount</Th>
                  <Th color="white">Balance</Th>
                  <Th color="white">Date</Th>
                  <Th color="white">Status</Th>
                  <Th color="white">Time</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions.map((transaction) => (
                  <Tr
                    key={transaction._id}
                    _hover={{
                      background: "teal.600",
                      color: "white",
                      cursor: "pointer",
                    }}
                    bgColor={
                      transaction.status === "Deposit"
                        ? "rgba(0, 128, 0, 0.1)"
                        : transaction.status === "Withdrawal"
                        ? "rgba(255, 0, 0, 0.1)"
                        : undefined
                    }
                  >
                    <Td>
                      <Text>${transaction.actionamount.toFixed(2)}</Text>
                    </Td>
                    <Td>${transaction.balance.toFixed(2)}</Td>
                    <Td>
                      {new Date(transaction.date).toLocaleString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </Td>
                    <Td>
                      <Text
                        color={
                          transaction.status === "Deposit"
                            ? "green.500"
                            : transaction.status === "Withdraw"
                            ? "red.500"
                            : undefined
                        }
                      >
                        {transaction.status}
                      </Text>
                    </Td>
                    <Td>{transaction.time}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>No transactions available.</Text>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default CustomerTransaction;
