import type { ReactNode } from "react";

import { Box, Divider } from "@chakra-ui/react";

import { useLoaderData } from "@remix-run/react";

import Navbar from "app/components/Navbar";
import Footer from "app/components/Footer";

import { FaGithub, FaLinkedin } from "react-icons/fa";

interface LayoutProps {
  children: ReactNode;
  cookies: string;
}

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");

  return cookieHeader;
};

const navigationLinks = [
  { label: "Solutions", url: "Solutions" },
  { label: "Products", url: "Features" },
  { label: "Resources", url: "Test" },
  { label: "About", url: "nopage" },
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

export default function Layout({ children, cookies }: LayoutProps) {
  cookies = useLoaderData();

  return (
    <Box
      display={"flex"}
      width={"100%"}
      minHeight={"100vh"}
      flexDirection={"column"}
      justifyContent="flex-start"
    >
      <Navbar
        navigationLinks={navigationLinks}
        eucronaAccounts={eucronaAccounts}
      />

      <Box>{children}</Box>

      <Box marginTop={"auto"}>
        <Divider />
        <Footer
          navigationLinks={navigationLinks}
          eucronaAccounts={eucronaAccounts}
        />
      </Box>
    </Box>
  );
}
