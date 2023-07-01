import { Button, Tooltip, useStatStyles } from "@chakra-ui/react";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Avatar } from "@chakra-ui/react";
import { ChatState } from "../context/chatProvide";
import {
  Menu,
  MenuItem,
  MenuDivider,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import Profile from "./Profile";

const Side = () => {
  const [search, setsearch] = useState([]);
  const [searchres, setsearchres] = useState([]);
  const [load, setload] = useState(false);
  const [loadchat, setloadchat] = useState(false);

  const { user } = ChatState();
  return (
    <>
      <Box
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        display="flex"
        alignItems="center"
        borderWidth="5px"
      >
        <Tooltip label="Search users" hasArrow placement="bottom-end">
          <Button variant="ghost">
            <i class="fa-solid fa-magnifying-glass"></i>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Source Sans 3" marginLeft="10px">
          R-Chat
        </Text>

        <div style={{ margin: "auto", marginRight: "0px" }}>
          <Menu>
            <MenuButton p={1}>
              <i class="fa-solid fa-bell"></i>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white">
              <Avatar size="sm" cursor="pointer" src={user.picture} />
            </MenuButton>
            <MenuList>
              <Profile user={user}>
                <MenuItem>My Profile</MenuItem>
              </Profile>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default Side;
