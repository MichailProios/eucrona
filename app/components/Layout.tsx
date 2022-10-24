import { Fragment, ReactNode, useEffect, useState } from "react";

import { Center, Divider, Spinner, Box } from "@chakra-ui/react";

import { useLoaderData, useMatches } from "@remix-run/react";

import ExecutionEnvironment from "exenv";

import Navbar from "app/components/Navbar";
import Footer from "app/components/Footer";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import useWindowDimensions from "app/utils/hooks/useWindowDimensions";

interface LayoutProps {
  children: ReactNode;
}

const navigationLinks = [
  { label: "Solutions", url: "Solutions" },
  { label: "Infrastructure", url: "Infrastructure" },
  { label: "Resources", url: "Test" },
  { label: "About", url: "Test" },
];

const eucronaAccounts = [
  {
    label: "Michail Proios LinkedIn",
    url: "https://www.linkedin.com/in/michail-proios/",
    isExternal: true,
    icon: <FaLinkedin />,
  },
  {
    label: "Michail Proios Github",
    url: "https://github.com/MichailProios",
    isExternal: true,
    icon: <FaGithub />,
  },
];

export default function Layout({ children }: LayoutProps) {
  const [flag, setFlag] = useState(false);

  const { height } = useWindowDimensions();

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      setFlag(true);
    }
  }, [setFlag]);

  // if (flag)
  return (
    <Box
      display={"flex"}
      width={"100%"}
      minHeight={height}
      flexDirection={"column"}
      justifyContent="flex-start"
    >
      <Navbar
        navigationLinks={navigationLinks}
        eucronaAccounts={eucronaAccounts}
      />

      {flag && (
        <Fragment>
          <Box>{children}</Box>{" "}
          <Box marginTop={"auto"}>
            <Divider />
            <Footer
              navigationLinks={navigationLinks}
              eucronaAccounts={eucronaAccounts}
            />
          </Box>
        </Fragment>
      )}
    </Box>
  );
}
