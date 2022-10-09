import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Container maxW={"1920px"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            PulseTrail <br />
            <Text as={"span"} color={"blue.400"}>
              Solutions
            </Text>
            <br /> <br />
            <Text as={"span"} color={useColorModeValue("gray.300", "gray.500")}>
              Under Construction
            </Text>
          </Heading>
        </Stack>
      </Container>
    </>
  );
}
