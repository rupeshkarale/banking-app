import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Alert,
  AlertIcon,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { url } from "./../constants/constatant";

const postData = (payload) => {
  return axios.post(`${url}/user/signup`, payload);
};

const Signup = () => {
  const [name, setName] = useState("");
  const [load, setLoad] = useState(false);
  const [selectedRole, setSelectedRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = () => {
    setLoad(true);
    if (email === "" || name === "" || password === "") {
      setLoad(false);
      toast({
        position: "top-center",
        render: () => (
          <Alert status="error">
            <AlertIcon />
            Enter all details
          </Alert>
        ),
      });
    } else {
      let data = { name, email, role: selectedRole, password };
      postData(data)
        .then((r) => {
          setLoad(false);
          navigate("/");
        })
        .catch((e) => {
          setLoad(false);
          toast({
            position: "top-center",
            render: () => (
              <Alert status="error">
                <AlertIcon />
                {e}
              </Alert>
            ),
          });
        });
    }
  };

  return (
    <Flex
      justify="center" // Center horizontally
      align="center" // Center vertically
      minH="100vh" // Minimum height to fill the viewport
      bg="blue.500"
    >
      <VStack p={10} spacing={2} color="white">
        <Box
          p={12}
          borderRadius="lg"
          boxShadow="md"
          w="100%"
          maxW="400px"
          textAlign="center"
          bgColor="white"
        >
          <h1
            style={{
              color: "#2196f9",
              fontSize: "30px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Sign up
          </h1>
          <Input
            mt="10px"
            value={name}
            placeholder="Name"
            bgColor="white"
            textColor="gray.500"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            mt="20px"
            value={email}
            placeholder="Email"
            textColor="gray.500"
            bgColor="white"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            mt="20px"
            type="password"
            value={password}
            placeholder="Password"
            textColor="gray.500"
            bgColor="white"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box mt="20px" display="flex" justifyContent="center">
            <Button
              size="sm"
              colorScheme={selectedRole === "customer" ? "teal" : "gray"}
              onClick={() => setSelectedRole("customer")}
              marginRight="10px"
            >
              Customer
            </Button>
            <Button
              colorScheme={selectedRole === "banker" ? "teal" : "gray"}
              onClick={() => setSelectedRole("banker")}
              size="sm"
            >
              Banker
            </Button>
          </Box>
          {load ? (
            <div class="custom-loader"></div>
          ) : (
            <Button
              w="100%"
              bgColor={"#2196f9"}
              onClick={handleSubmit}
              color="white"
              p="0 10px"
              m="auto"
              display="flex"
              mt="15px"
            >
              Sign up
            </Button>
          )}
          <Button
            w="100%"
            bgColor={"#2196f9"}
            color="white"
            p="0 10px"
            m="auto"
            display="flex"
            mt="15px"
            onClick={() => navigate("/")}
          >
            Already have an account
          </Button>
        </Box>
      </VStack>
    </Flex>
  );
};

export default Signup;
