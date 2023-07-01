import React, { useState } from "react";
import { VStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const cors = require("cors");

const Signup = () => {
  cors();
  const history = useHistory;
  const toast = useToast();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmp, setconfirmp] = useState();
  const [pic, setpic] = useState();
  const [show, setshow] = useState(true);
  const [load, setload] = useState(false);
  const handleClick = () => setshow(!show);
  const post = (pics) => {
    setload(true);
    if (pics === undefined) {
      toast({
        title: "Image not uploaded",
        description: "Image format not supported",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "rchat_app");
      data.append("withcredentials", "false");
      data.append("cloud_name", "dn3utjdhp");
      fetch("https://api.cloudinary.com/v1_1/dn3utjdhp/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          console.log(data.url.toString());
          setload(false);
        })
        .catch((err) => {
          console.log(err);
          setload(false);
        });
    } else {
      toast({
        title: "Use Jpeg or PNG",
        description: "Image format not supported",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setload(false);
      return;
    }
  };
  const submithandler = async () => {
    setload(true);
    if (!name || !email || !password || !confirmp) {
      toast({
        title: "Incomplete!!!",
        description: "Please fill all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setload(false);
      return;
    }
    if (password !== confirmp) {
      toast({
        title: "Password mismatch!!!",
        description: "Make sure the passwords are matching",
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
          "content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Success!!!",
        description: "Registration is successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setload(false);
      history.pushState("chats");
    } catch (err) {
      toast({
        title: "Unsuccessful!!!",
        description: "Try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <VStack spacing="6px" color="black">
      <FormControl id="fname" isRequired>
        <FormLabel>Name:</FormLabel>
        <Input
          placeholder="Name"
          onChange={(e) => {
            setname(e.target.value);
          }}
        ></Input>
      </FormControl>
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
      <FormControl id="confpassword" isRequired>
        <FormLabel>Confirm Password:</FormLabel>
        <InputGroup>
          <Input
            type={!show ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => {
              setconfirmp(e.target.value);
            }}
          ></Input>
          <InputRightElement width={"4.5rem"}>
            <Button h="2rem" size="sm" onClick={handleClick}>
              {!show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Profile Picture:</FormLabel>

        <Input
          type="file"
          p="1"
          accept="image/*"
          onChange={(e) => post(e.target.files[0])}
        ></Input>
      </FormControl>
      <Button
        colorScheme="green"
        w="100%"
        marginTop="15"
        onClick={submithandler}
        isLoading={load}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
