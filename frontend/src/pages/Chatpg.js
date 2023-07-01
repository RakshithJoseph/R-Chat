import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex } from "@chakra-ui/react";
import Side from "../components/side.js";
import { ChatState } from "../context/chatProvide";
import Chatbox from "../components/Chatbox.js";
import Mychats from "../components/Mychats.js";
const Chatpg = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <Side />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <Mychats />}
        {user && <Chatbox />}
      </Box>
    </div>
  );
};

export default Chatpg;
