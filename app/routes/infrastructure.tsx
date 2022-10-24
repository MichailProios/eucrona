import React, { Fragment } from "react";
import {
  Box,
  chakra,
  Container,
  Text,
  HStack,
  VStack,
  Flex,
  useColorModeValue,
  useBreakpointValue,
  Link,
  Stack,
  Button,
} from "@chakra-ui/react";

import { FaGithub } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";

const milestones = [
  {
    id: 1,
    date: "MARCH 30, 2022",
    title: "Chakra Hackathon",
    description: `Winner of first ever ChakraUI Hackathon. On sait depuis longtemps que travailler avec du texte lisible et contenant du sens.`,
  },
  {
    id: 2,
    date: "July 30, 2021",
    title: "Open Source, first contribution",
    description: `Fixing a typo, to fix a bug, contributing to Open Source and collaborating to improve technology for everyone, Ahmad's world changed again!.`,
  },
  {
    id: 3,
    date: "July 30, 2018",
    title: "Freelancing, started working for myself",
    description:
      "Ahmad starts his own business consulting for companies as a fullstack developer. Clients include UK Government departments, UK banks, global fintechs and startups.",
  },
  {
    id: 4,
    date: "July 30, 2018",
    title: "Freelancing, started working for myself",
    description:
      "Ahmad starts his own business consulting for companies as a fullstack developer. Clients include UK Government departments, UK banks, global fintechs and startups.",
  },
  {
    id: 5,
    date: "July 30, 2018",
    title: "Freelancing, started working for myself",
    description:
      "Ahmad starts his own business consulting for companies as a fullstack developer. Clients include UK Government departments, UK banks, global fintechs and startups.",
  },
  {
    id: 6,
    date: "July 30, 2018",
    title: "Freelancing, started working for myself",
    description:
      "Ahmad starts his own business consulting for companies as a fullstack developer. Clients include UK Government departments, UK banks, global fintechs and startups.",
  },

  {
    id: 7,
    date: "July 30, 2018",
    title: "Freelancing, started working for myself",
    description:
      "Ahmad starts his own business consulting for companies as a fullstack developer. Clients include UK Government departments, UK banks, global fintechs and startups.",
  },
  {
    id: 8,
    date: "July 30, 2018",
    title: "Freelancing, started working for myself",
    description:
      "Ahmad starts his own business consulting for companies as a fullstack developer. Clients include UK Government departments, UK banks, global fintechs and startups.",
  },
];

const Milestones = () => {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { ssr: false }
  );
  const isDesktop = useBreakpointValue(
    { base: false, md: true },
    { ssr: false }
  );

  return (
    <Fragment>
      <Container maxW="1200px" px={{ base: 6, md: 10 }} py={14}>
        <chakra.h3 fontSize="4xl" fontWeight="bold" mb={18} textAlign="center">
          Infrastructure
        </chakra.h3>

        {milestones.map((milestone) => (
          <Flex key={milestone.id} mb="10px">
            {/* Desktop view(left card) */}
            {isDesktop && milestone.id % 2 === 0 && (
              <>
                <EmptyCard />
                <LineWithDot />
                <Card {...milestone} />
              </>
            )}

            {/* Mobile view */}
            {isMobile && (
              <>
                <LineWithDot />
                <Card {...milestone} />
              </>
            )}

            {/* Desktop view(right card) */}
            {isDesktop && milestone.id % 2 !== 0 && (
              <>
                <Card {...milestone} />

                <LineWithDot />
                <EmptyCard />
              </>
            )}
          </Flex>
        ))}
      </Container>
      <Container maxW="5xl" p={{ base: 5, md: 10 }}>
        <Box
          pos="relative"
          boxShadow="2xl"
          bg={useColorModeValue("gray.50", "gray.700")}
          p={{ base: 4, sm: 8 }}
          overflow="hidden"
          rounded="lg"
        >
          <Stack
            pos="relative"
            zIndex={1}
            direction="column"
            spacing={5}
            textAlign="left"
          >
            <chakra.h1 fontSize="4xl" lineHeight={1.2} fontWeight="bold">
              Join the community
            </chakra.h1>
            <chakra.h1
              color="gray.400"
              fontSize="xl"
              maxW="600px"
              lineHeight={1.2}
            >
              TemplatesKart has a very friendly community, we are always open to
              new ideas and feedback. Join us on Discord or GitHub Discussions
              to get any kind of help or on Twitter to get notified about
              releases.
            </chakra.h1>

            <Stack direction={{ base: "column", md: "row" }} spacing={3}>
              <Button
                leftIcon={<FaGithub />}
                as={Link}
                href="#"
                rounded="md"
                color="gray.800"
                bg="white"
                _hover={{ bg: "gray.100" }}
              >
                Github Discussions
              </Button>
              <Button
                leftIcon={<BsDiscord />}
                as={Link}
                href="#"
                rounded="md"
                color="white"
                bg="purple.500"
                _hover={{ bg: "purple.600" }}
              >
                Discord community
              </Button>
              <Button
                leftIcon={<AiOutlineTwitter />}
                as={Link}
                href="#"
                rounded="md"
                color="white"
                bg="twitter.400"
                _hover={{ bg: "twitter.500" }}
              >
                Follow us on Twitter
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Fragment>
  );
};

interface CardProps {
  id: number;
  title: string;
  description: string;
  date: string;
}

const Card = ({ id, title, description, date }: CardProps) => {
  // For even id show card on left side
  // For odd id show card on right side
  const isEvenId = id % 2 == 0;
  let borderWidthValue = isEvenId ? "15px 15px 15px 0" : "15px 0 15px 15px";
  let leftValue = isEvenId ? "-15px" : "unset";
  let rightValue = isEvenId ? "unset" : "-15px";

  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isMobile) {
    leftValue = "-15px";
    rightValue = "unset";
    borderWidthValue = "15px 15px 15px 0";
  }

  return (
    <HStack
      flex={1}
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue("gray.100", "gray.800")}
      spacing={5}
      rounded="lg"
      alignItems="center"
      pos="relative"
      _before={{
        content: `""`,
        w: "0",
        h: "0",
        borderColor: `transparent ${useColorModeValue(
          "#edf2f6",
          "#1a202c"
        )} transparent`,
        borderStyle: "solid",
        borderWidth: borderWidthValue,
        position: "absolute",
        left: leftValue,
        right: rightValue,
        display: "block",
      }}
    >
      <Box>
        <Text fontSize="lg" color={isEvenId ? "teal.400" : "blue.400"}>
          {date}
        </Text>

        <VStack spacing={2} mb={3} textAlign="left">
          <chakra.h1 fontSize="2xl" lineHeight={1.2} fontWeight="bold" w="100%">
            {title}
          </chakra.h1>
          <Text fontSize="md">{description}</Text>
        </VStack>
      </Box>
    </HStack>
  );
};

const LineWithDot = () => {
  return (
    <Flex
      pos="relative"
      alignItems="center"
      mr={{ base: "40px", md: "40px" }}
      ml={{ base: "0", md: "40px" }}
    >
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        top="0px"
      ></chakra.span>
      <Box pos="relative" p="10px">
        <Box
          pos="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          width="100%"
          height="100%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          bg={useColorModeValue("gray.600", "gray.200")}
          borderRadius="100px"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};

const EmptyCard = () => {
  return (
    <Box
      flex={{ base: 0, md: 1 }}
      p={{ base: 0, md: 6 }}
      bg="transparent"
    ></Box>
  );
};

export default Milestones;
