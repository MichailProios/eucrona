import { useEffect } from "react";
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useActionData } from "@remix-run/react";

import { json } from "@remix-run/cloudflare";

import {
  ValidatedForm,
  validationError,
  useIsSubmitting,
  useField,
} from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export const validator = withZod(
  z.object({
    fullName: z.string().min(1, { message: "Full Name is required" }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),

    subject: z.string().min(1, { message: "Subject is required" }),

    body: z.string().min(1, { message: "Body is required" }),
  })
);

export async function action({ request }: { request: Request }) {
  const data = await validator.validate(await request.formData());
  console.log(data);

  if (data.error) {
    return validationError(data.error);
  }

  return data;
}

export default function Contacts() {
  const actionData = useActionData();

  const { error, getInputProps } = useField("fullName", {
    formId: "contactForm",
  });
  const isSubmitting = useIsSubmitting("contactForm");

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Container maxW="1200px" px={{ base: 6, md: 10 }} py={14}>
      <Stack
        spacing={10}
        as={ValidatedForm}
        validator={validator}
        method="post"
        id="contactForm"
      >
        <Flex align="center" justify="center" direction="column">
          <Heading fontSize="4xl" mb={2}>
            Contact Us
          </Heading>
          <Text fontSize="md" textAlign="center">
            Send us your requests and questions
          </Text>
        </Flex>

        <VStack
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
              <FormControl id="fullName" isInvalid={error ? true : false}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  rounded="md"
                />
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
              </FormControl>
              <FormControl id="emailAddress">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="emailAddress"
                  placeholder="Enter your email address"
                  rounded="md"
                />
              </FormControl>
            </Stack>
            <FormControl id="subject">
              <FormLabel>Subject</FormLabel>
              <Input
                type="text"
                name="subject"
                placeholder="Enter the subject"
                rounded="md"
              />
            </FormControl>
            <FormControl id="body">
              <FormLabel>Message</FormLabel>
              <Textarea
                size="lg"
                name="body"
                placeholder="Enter your message"
                rounded="md"
              />
            </FormControl>

            {actionData && (
              <Alert variant="info">
                <AlertIcon />
                <AlertTitle>{actionData.title}</AlertTitle>
                <AlertDescription>{actionData.description}</AlertDescription>
              </Alert>
            )}
          </VStack>
          <VStack w="100%">
            <Button type="submit" colorScheme="primary" disabled={isSubmitting}>
              Send Message
            </Button>
          </VStack>
        </VStack>
      </Stack>
    </Container>
  );
}
