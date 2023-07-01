import React from "react";
import { useState } from "react";
import { Toast, VStack, background, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const Login = () => {
  const [email, setemail] = useState();
  const toast = useToast();
  const history = useHistory();
  const [password, setpassword] = useState();
  const [show, setshow] = useState(true);
  const [load, setload] = useState(false);
  const handleClick = () => setshow(!show);

  const submithandler = async () => {
    setload(true);
    if (!email || !password) {
      toast({
        title: "Incomplete",
        description: "Please fill all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setload(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Success!!!",
        description: "Login is successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setload(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Login failed!!!",
        description: "Login is unsuccessful",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setload(false);
    }
  };
  return (
    <VStack spacing="6px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email:</FormLabel>
        <Input
          placeholder="Email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password:</FormLabel>
        <InputGroup>
          <Input
            type={!show ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          ></Input>
          <InputRightElement width={"4.5rem"}>
            <Button h="2rem" size="sm" onClick={handleClick}>
              {!show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="green"
        w="100%"
        marginTop="15"
        onClick={submithandler}
        isLoading={load}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
