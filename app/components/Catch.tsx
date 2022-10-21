import React from "react";
import { Heading, Text, Button, Container, VStack } from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface CatchProps {
  caught: any;
}

export default function Catch({ caught }: CatchProps) {
  return (
    <Container mt="5em">
      <VStack spacing={5}>
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
      </VStack>
    </Container>
  );
}
