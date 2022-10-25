import { Fragment } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Flex,
  Text,
  Icon,
  Divider,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons

export default function Contacts() {
  return (
    <Container maxW="1200px" px={{ base: 6, md: 10 }} py={14}>
      <Stack spacing={10}>
        <Flex align="center" justify="center" direction="column">
          <Heading fontSize="4xl" mb={2}>
            Contact Us
          </Heading>
          <Text fontSize="md" textAlign="center">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque
          </Text>
        </Flex>

        <VStack
          as="form"
          spacing={8}
          w="100%"
          bg={useColorModeValue("white", "gray.700")}
          rounded="lg"
          boxShadow="lg"
          p={{ base: 5, sm: 10 }}
        >
          <VStack spacing={4} w="100%">
            <Stack
              w="100%"
              spacing={3}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" placeholder="Ahmad" rounded="md" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="test@test.com" rounded="md" />
              </FormControl>
            </Stack>
            <FormControl id="subject">
              <FormLabel>Subject</FormLabel>
              <Input
                type="text"
                placeholder="Are you available for freelance work?"
                rounded="md"
              />
            </FormControl>
            <FormControl id="message">
              <FormLabel>Message</FormLabel>
              <Textarea
                size="lg"
                placeholder="Enter your message"
                rounded="md"
              />
            </FormControl>
          </VStack>
          <VStack w="100%">
            <Button
              // bg="green.300"
              // color="white"
              // _hover={{
              //   bg: "green.500",
              // }}
              // rounded="md"
              // w={{ base: "100%", md: "max-content" }}
              colorScheme="primary"
            >
              Send Message
            </Button>
          </VStack>
        </VStack>
      </Stack>
    </Container>
  );
}
