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
} from "@chakra-ui/react";

import { NavLink, useLoaderData } from "@remix-run/react";

import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import logo from "public/logos/Logo-Sideways-Large-No-Padding.svg";
import logoDark from "public/logos/Logo-Sideways-Large-No-Padding-DarkMode.svg";

interface NavbarProps {
  children: ReactNode;
  cookies: string;
}

const Links = [
  { section: "Features", url: "Features" },
  { section: "Features1", url: "Features1" },
  { section: "Features2", url: "Features2" },
];

const NavLinkAppbar = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => (
  <chakra.span
    px={3}
    py={1.5}
    w={"6em"}
    textAlign="center"
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      color: "brand.main",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    draggable="false"
    as={NavLink}
    to={href}
  >
    {children}
  </chakra.span>
);

const NavLinkDrawer = ({
  children,
  closeDialog,
  href,
}: {
  children: ReactNode;
  closeDialog: any;
  href: string;
}) => (
  <chakra.span
    p={2}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      color: "brand.main",
      bg: useColorModeValue("gray.200", "gray.800"),
    }}
    onClick={closeDialog}
    w={"100%"}
    draggable="false"
    as={NavLink}
    to={href}
  >
    {children}
  </chakra.span>
);

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
        px={12}
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"100%"}
          maxW={"1400px"}
        >
          <HStack spacing="24px">
            <NavLink to={"/"}>
              <Image
                objectFit="contain"
                h={55}
                w={"auto"}
                src={colorMode === "light" ? logo : logoDark}
                alt="PulseTrail-Sideways"
                draggable="false"
              />
            </NavLink>
            <HStack spacing="24px" display={{ base: "none", lg: "flex" }}>
              {Links.map((link, index) => (
                <NavLinkAppbar key={index} href={link.url}>
                  {link.section}
                </NavLinkAppbar>
              ))}
            </HStack>
          </HStack>

          <HStack spacing="24px">
            <IconButton
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
            >
              Sign In
            </Button>
            <Button
              fontSize={"sm"}
              fontWeight={600}
              variant="primary"
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
              src={colorMode === "light" ? logo : logoDark}
              alt="PulseTrail-Sideways"
              draggable="false"
            />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing="16px" align="stretch">
              {Links.map((link, index) => (
                <NavLinkDrawer
                  key={index}
                  closeDialog={onClose}
                  href={link.url}
                >
                  {link.section}
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
                variant="primary"
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
