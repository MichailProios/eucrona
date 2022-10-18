import { ReactNode, useState, useRef, forwardRef } from "react";

import {
  chakra,
  Box,
  Flex,
  Image,
  HStack,
  Button,
  IconButton,
  useColorModeValue,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerFooter,
  VStack,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerHeader,
  Link,
} from "@chakra-ui/react";

import { NavLink, useLoaderData } from "@remix-run/react";

// import Footer from "app/components/Footer";

import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import logo from "public/logos/Logo-Sideways.svg";

interface NavbarProps {
  children: ReactNode;
  cookies: string;
}

const Links = [
  { section: "Solutions", url: "Solutions" },
  { section: "test", url: "Features" },
  { section: "Resources", url: "Test" },
  { section: "About", url: "nopage" },
];

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");

  return cookieHeader;
};

export default function Navbar({ children, cookies }: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { colorMode, toggleColorMode } = useColorMode();

  cookies = useLoaderData();

  return (
    <Box>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"center"}
        px={{ base: 6, lg: 12 }}
        bg={useColorModeValue("gray.100", "gray.900")}
        position="sticky"
        top={0}
        zIndex={800}
        width={"100%"}
        as="header"
      >
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"100%"}
          maxW={"1600px"}
        >
          <HStack spacing="10px">
            <NavLink to={"/"} prefetch="render" draggable={false}>
              <Image
                objectFit="contain"
                h={50}
                w={"auto"}
                src={logo}
                alt="Eucrona-Logo"
                draggable="false"
              />
            </NavLink>
            <HStack spacing="24px" display={{ base: "none", lg: "flex" }}>
              {Links.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.url}
                  draggable="false"
                  prefetch="render"
                >
                  {({ isActive }) => (
                    <Button
                      onClick={onClose}
                      variant="ghost"
                      isActive={isActive}
                      w={"6em"}
                    >
                      {link.section}
                    </Button>
                  )}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <HStack spacing="12px">
            <IconButton
              variant={"ghost"}
              aria-label="Color Scheme"
              onClick={() => {
                toggleColorMode();
              }}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </IconButton>

            <Button
              fontSize={"sm"}
              fontWeight={400}
              display={{ base: "none", lg: "flex" }}
              as={Link}
              href="https://cloud.eucrona.com"
              style={{ textDecoration: "none" }}
              variant={"solid"}
            >
              Sign In
            </Button>

            <Button
              fontSize={"sm"}
              fontWeight={600}
              variant="solid"
              colorScheme={"primary"}
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
          <DrawerHeader p={2} alignSelf="center">
            <NavLink to={"/"} onClick={onClose} prefetch="render">
              <Image
                objectFit="contain"
                h={50}
                w={"auto"}
                src={logo}
                alt="Eucrona-Logo"
                draggable="false"
              />
            </NavLink>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing="16px" align="stretch">
              {Links.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.url}
                  draggable="false"
                  prefetch="render"
                >
                  {({ isActive }) => (
                    <Button
                      onClick={onClose}
                      variant="ghost"
                      isActive={isActive}
                      w={"100%"}
                    >
                      {link.section}
                    </Button>
                  )}
                </NavLink>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter alignSelf="center" width={"100%"}>
            <VStack spacing="12px" width={"100%"}>
              <Button
                fontSize={"sm"}
                width={"100%"}
                fontWeight={400}
                as={Link}
                href="https://cloud.eucrona.com"
                style={{ textDecoration: "none" }}
                variant={"solid"}
              >
                Sign In
              </Button>

              <Button
                width={"100%"}
                fontSize={"sm"}
                fontWeight={600}
                variant="solid"
                colorScheme={"primary"}
              >
                Sign Up
              </Button>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box>{children}</Box>
      {/* <Footer /> */}
    </Box>
  );
}
