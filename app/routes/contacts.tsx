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

import { sesTest } from "app/utils/email.server";

export const validator = withZod(
  z.object({
    fullName: z.string().min(1, { message: "Full Name is required" }),

    emailAddress: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),

    subject: z.string().min(1, { message: "Subject is required" }),

    body: z.string().min(1, { message: "Body is required" }),
  })
);

export async function action({ request }: { request: Request }) {
  const data = await validator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  const { fullName, emailAddress, subject, body } = data.data;

  sesTest()
    .then((data: any) => {
      console.log(data);
    })
    .catch((err: any) => {
      console.log(err);
    });

  return data;
}

function TextField(props: any) {
  const { error, getInputProps } = useField(props.name);

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <Input {...props} {...getInputProps()} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

function TextArea(props: any) {
  const { error, getInputProps } = useField(props.name);

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <Textarea {...props} {...getInputProps()} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

function SubmitButton(props: any) {
  const isSubmitting = useIsSubmitting();
  const actionData = useActionData();

  // console.log(actionData);

  return (
    <Button {...props} isLoading={isSubmitting} loadingText="Sending">
      {props.label}
    </Button>
  );
}

export default function Contacts() {
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
              {/* <FormControl id="fullName" isInvalid={error ? true : false}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  rounded="md"
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl> */}

              <TextField
                label="Name"
                name="fullName"
                placeholder="Enter your full name"
                rounded="md"
                type="text"
              />

              <TextField
                label="Email"
                type="email"
                name="emailAddress"
                placeholder="Enter your email address"
                rounded="md"
              />
            </Stack>

            <TextField
              label="Subject"
              type="text"
              name="subject"
              placeholder="Enter the subject"
              rounded="md"
            />

            <TextArea
              label="Message"
              type="text"
              size="lg"
              name="body"
              placeholder="Enter your message"
              rounded="md"
            />
          </VStack>
          <VStack w="100%">
            <SubmitButton
              type="submit"
              colorScheme="primary"
              label="Send Message"
            />
          </VStack>
        </VStack>
      </Stack>
    </Container>
  );
}
