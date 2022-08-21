import { ReactNode, useState, useRef } from "react";

import {
  Box,
  Flex,
  Image,
  HStack,
  Button,
  IconButton,
  Link,
  useColorModeValue,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import logo from "public/logos/Logo-Sideways-Large.svg";

import useWindowDimensions from "~/utils/hooks/useWindowDimensions";

interface NavbarProps {
  children: React.ReactNode;
}

const Links = ["Dashboard", "Projects", "Team", "About", "Services"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Navbar({ children }: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={12}
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <HStack spacing="24px">
          <Image
            objectFit="contain"
            h={160}
            w={"auto"}
            src={logo}
            alt="PulseTrail-Sideways"
            draggable="false"
          />
          <HStack spacing="24px" display={{ base: "none", lg: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>

        <HStack spacing="24px">
          <IconButton aria-label="Color Scheme" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </IconButton>
          <Button
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            display={{ base: "none", lg: "flex" }}
          >
            Sign In
          </Button>
          <Button
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            _hover={{
              bg: "pink.300",
            }}
            display={{ base: "none", lg: "flex" }}
          >
            Sign Up
          </Button>

          <IconButton aria-label="Open Drawer" ref={btnRef} onClick={onOpen}>
            <HamburgerIcon />
          </IconButton>
        </HStack>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <h2>test</h2>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {children}
    </Box>
  );
}
