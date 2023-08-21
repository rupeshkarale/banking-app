import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
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
import { getProfile } from "../Redux/ProfileReducer/action";

function Transactions({ username }) {
  const [accessToken, SetAccessToken] = useState(localStorage.getItem("token"));
  const profile = useSelector((store) => store.ProfileReducer.data);
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [message, setMessage] = useState("");
  const [erroMessage, SetErroMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("Deposit");
  const navigate = useNavigate();

  const getTransactions = async () => {
    try {
      const response = await axios.get(
        `${url}/account/gettransection/${localStorage.getItem("userId")}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log(response.data);
      console.log(localStorage.getItem("userId"));
      setTransactions(response.data);
      dispatch(getProfile(accessToken));
    } catch (error) {
      console.error(error);
      setMessage("Authentication failed. Please log in again.");
    }
  };

  useEffect(() => {
    getTransactions();
    dispatch(getProfile(accessToken));
  }, [accessToken]);

  // Define your custom theme with dark background, custom fonts, and colors
  const theme = extendTheme({
    config: {
      initialColorMode: "light", // Set the initial color mode to dark
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

  // Function to open the modal for deposit
  const openDepositModal = () => {
    setTransactionType("Deposit");
    onOpen();
  };

  // Function to open the modal for withdrawal
  const openWithdrawalModal = () => {
    setTransactionType("Withdrawal");
    onOpen();
  };

  const deposit = async () => {
    try {
      let newamount = profile.balance + Number(amount);
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      const currentSeconds = currentTime.getSeconds();

      let payload = {
        time: `${currentHours}:${currentMinutes}:${currentSeconds}`,
        status: "Deposit",
        actionamount: amount,
        balance: newamount,
      };
      console.log(accessToken);
      await axios.patch(`${url}/user/updateprofile`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `bearer ${accessToken}`,
        },
      });

      setTransactionAmount("");
      setMessage("Deposit successful.");
      getTransactions();
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      onClose();
    } catch (error) {
      console.error(error);
      setMessage("Deposit failed. Please try again.");
    }
  };

  const withdraw = async () => {
    let newamount = profile.balance - Number(amount);
    if (newamount < 0) {
      SetErroMessage(
        `withdraw amount should not be less than account balance which is ${profile.balance}`
      );
      setTimeout(() => {
        SetErroMessage(null);
      }, 5000);
      onClose();
      return;
    }
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();

    let payload = {
      time: `${currentHours}:${currentMinutes}:${currentSeconds}`,
      status: "Withdraw",
      actionamount: amount,
      balance: newamount,
    };

    try {
      await axios.patch(`${url}/user/updateprofile`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `bearer ${accessToken}`,
        },
      });
      setAmount("");
      setMessage("Withdrawal successful.");
      getTransactions();
      onClose();
    } catch (error) {
      console.error(error);
      setMessage("Withdrawal failed. Please try again.");
    }
  };

  return (
    <ChakraProvider>
      <Box p={4} bg="blue.500" color="white" minH="100vh">
        <VStack spacing={4} align="flex-start" w="100%">
          <HStack justify="space-between" m="auto" w="80%">
            <Heading as="h1" size="xl">
              Welcome, {profile.name}!
            </Heading>
            <HStack spacing={4}>
              {profile.balance !== undefined && (
                <Text fontSize="lg" color="white">
                  Balance: ${profile.balance}
                </Text>
              )}
            </HStack>
          </HStack>
          <HStack spacing={4} justifyContent="space-between" m="auto" w="80%">
            <Button
              colorScheme="whatsapp"
              variant="solid"
              onClick={openDepositModal}
            >
              Deposit
            </Button>
            <Button
              colorScheme="red"
              variant="solid"
              onClick={openWithdrawalModal}
            >
              Withdraw
            </Button>
          </HStack>
          {message && (
            <Alert status="success">
              <AlertIcon />
              {message}
            </Alert>
          )}
          {erroMessage && (
            <Alert color="GrayText" m="auto" w="50%" status="error">
              <AlertIcon />
              {erroMessage}
            </Alert>
          )}
          {transactions.length > 0 ? (
            <Table
              variant="simple"
              color="blackAlpha.800"
              bg="white"
              borderRadius="2xl"
              w="80%"
              m="auto"
            >
              <Thead>
                <Tr>
                  <Th>Sr No</Th>
                  <Th>Action Amount</Th>
                  <Th>Balance</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions.map((transaction, index) => (
                  <Tr
                    key={transaction._id}
                    _hover={{
                      background: "blue.300",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    <Td>{index + 1}</Td>
                    <Td>
                      <Text
                        color={
                          transaction.status === "Deposit"
                            ? "green.500" // Green text color for Deposit
                            : transaction.status === "Withdraw"
                            ? "red.500" // Red text color for Withdrawal
                            : undefined // Default text color
                        }
                      >
                        ${transaction.actionamount}
                      </Text>
                    </Td>
                    <Td>${transaction.balance}</Td>
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
                            ? "green.500" // Green text color for Deposit
                            : transaction.status === "Withdraw"
                            ? "red.500" // Red text color for Withdrawal
                            : undefined // Default text color
                        }
                      >
                        {transaction.status}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>No transactions available.</Text>
          )}
        </VStack>
        {/* Modal for Deposit/Withdrawal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Available Balance: ${profile.balance}</ModalHeader>

            <ModalCloseButton />
            <ModalBody>
              {/* Input field for deposit/withdrawal amount */}
              <Input
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                onClick={transactionType === "Deposit" ? deposit : withdraw}
              >
                {transactionType === "Deposit" ? "Deposit" : "Withdraw"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}

export default Transactions;
