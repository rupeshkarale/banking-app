import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Flex, // Import Flex from Chakra UI
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../constants/constatant";
import { getProfile } from "../Redux/ProfileReducer/action";
import { useDispatch, useSelector } from "react-redux";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.ProfileReducer.data);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      const response = await axios.post(`${url}/user/login`, {
        email: username,
        password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      dispatch(getProfile(response.data.token));
      if (response.data.role === "banker") {
        navigate(`/allTransaction`);
      } else {
        navigate("/transaction");
      }
    } catch (error) {
      console.error(error);
      setMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <Flex
      justify="center" // Center horizontally
      align="center" // Center vertically
      minH="100vh" // Minimum height to fill the viewport
      bg="blue.500"
    >
      <VStack
        p={10}
        spacing={1}
        align="center"
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        w="100%"
        maxW="400px"
        textAlign="center"
      >
        <Heading as="h1" size="xl" mb={4}>
          Login
        </Heading>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          mb={4}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={4}
        />
        <Button colorScheme="blue" onClick={login}>
          Login
        </Button>
        <Text mt={4}>Don't have an account?</Text>
        <Button
          colorScheme="blue"
          variant="link"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Button>
        {message && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {message}
          </Alert>
        )}
      </VStack>
    </Flex>
  );
}

export default Login;
