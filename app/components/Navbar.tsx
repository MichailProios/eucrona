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
  VStack,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  DrawerHeader,
} from "@chakra-ui/react";

import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import logo from "public/logos/Logo-Sideways-Large-No-Padding.svg";

interface NavbarProps {
  children: React.ReactNode;
}

const Links = ["Dashboard", "Projects", "Team", "About", "Services"];

const NavLinkAppbar = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={""}
  >
    {children}
  </Link>
);

const NavLinkDrawer = ({
  children,
  closeDialog,
}: {
  children: ReactNode;
  closeDialog: any;
}) => (
  <Link
    p={2}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.800"),
    }}
    href={""}
    onClick={closeDialog}
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
        justifyContent={"center"}
        px={12}
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"100%"}
          maxW={"1920px"}
        >
          <HStack spacing="24px">
            <Image
              style={{ fill: "black" }}
              objectFit="contain"
              h={55}
              w={"auto"}
              src={logo}
              alt="PulseTrail-Sideways"
              draggable="false"
            />
            <HStack spacing="24px" display={{ base: "none", lg: "flex" }}>
              {Links.map((link) => (
                <NavLinkAppbar key={link}>{link}</NavLinkAppbar>
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

            <IconButton
              aria-label="Open Drawer"
              ref={btnRef}
              onClick={onOpen}
              display={{ lg: "none" }}
            >
              <HamburgerIcon />
            </IconButton>
          </HStack>
        </Flex>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />

        <DrawerContent>
          {/* <DrawerCloseButton /> */}

          <DrawerHeader p={2} alignSelf="center">
            <Image
              objectFit="contain"
              h={55}
              w={"auto"}
              src={logo}
              alt="PulseTrail-Sideways"
              draggable="false"
            />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing="16px" align="stretch">
              {Links.map((link) => (
                <NavLinkDrawer key={link} closeDialog={onClose}>
                  {link}
                </NavLinkDrawer>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter alignSelf="center">
            <HStack spacing="24px">
              <Button fontSize={"sm"} width={"100%"} fontWeight={400}>
                Sign In
              </Button>
              <Button
                width={"100%"}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Sign Up
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {children}
    </Box>
  );
}
