import { ReactNode, useState } from "react";

import {
  Box,
  Flex,
  Image,
  HStack,
  Button,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

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
  const [windowDimensions, setWindowDimensions] = useState(
    useWindowDimensions()
  );

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
          <HStack spacing="24px">
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>

        <HStack spacing="24px">
          <Button fontSize={"sm"} fontWeight={400} variant={"link"}>
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
          >
            Sign Up
          </Button>
        </HStack>
      </Flex>
      <Box h={`calc(${windowDimensions.height}px - 64px)`}>{children}</Box>
    </Box>
  );
}
