import React from "react";
import {
  Heading,
  Text,
  Button,
  useColorModeValue,
  Container,
  VStack,
} from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface CatchProps {
  caught: any;
}

export default function Catch({ caught }: CatchProps) {
  return (
    <Container
      mt="5em"
      width={{ base: "auto", sm: "20em" }}
      mx={{ base: "1em", sm: "auto" }}
      height="14em"
      boxShadow="lg"
      rounded="md"
      bg={useColorModeValue("gray.100", "gray.900")}
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      flexDirection="column"
    >
      <VStack>
        <Heading bgGradient="linear(to-br, #228be6, #15aabf)" bgClip="text">
          {caught.status}
        </Heading>
        <Text fontSize="18px" display="block" maxW={"20em"}>
          {caught.statusText}
        </Text>
      </VStack>

      <Button
        rightIcon={<ArrowForwardIcon />}
        variant="solid"
        colorScheme={"primary"}
        size="lg"
        as={NavLink}
        to="/"
      >
        Go to Home
      </Button>
    </Container>
  );
}
