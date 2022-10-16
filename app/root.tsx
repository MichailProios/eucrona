import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import {
  extendTheme,
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
} from "@chakra-ui/react";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/cloudflare";

import { ServerStyleContext, ClientStyleContext } from "app/context";

import Navbar from "app/components/Navbar";
import NotFound from "app/components/NotFound";

import { loader as navbarLoader } from "app/components/Navbar";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "PulseTrail",
  viewport: "width=device-width,initial-scale=1",
});

export let links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon/favicon.ico",
    },
    {
      rel: "manifest",

      href: "/favicon/site.webmanifest",
    },
  ];
};

const colors = {
  brand: {
    light: "linear(130deg, rgba(57,169,241,1) 20%, rgba(14,198,203,1) 80%)",
    main: "linear(130deg, rgba(57,169,241,1) 20%, rgba(14,198,203,1) 80%)",
    dark: "linear(130deg, rgba(6,118,190,1) 20%, rgba(0,147,152,1) 80%)",
  },
};

const config = {
  useSystemColorMode: true,
};

const components = {
  Button: {
    variants: {
      primary: {
        transition: "all 0.5s",
        bgGradient:
          "linear(130deg, rgba(57,169,241,1) 20%, rgba(14,198,203,1) 80%)",
        color: "white",

        _hover: {
          bgGradient:
            "linear(130deg, rgba(32,144,216,1) 20%, rgba(0,173,178,1) 80%)",
        },
        _active: {
          bgGradient:
            "linear(130deg, rgba(6,118,190,1) 20%, rgba(0,147,152,1) 80%)",
        },
      },
    },
  },
};

const theme = extendTheme({ config, colors, components });

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    useEffect(() => {
      emotionCache.sheet.container = document.head;
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        </body>
      </html>
    );
  }
);

export default function App() {
  let cookies = "";

  return (
    <Document>
      <ChakraProvider
        theme={theme}
        colorModeManager={
          cookies.length > 0
            ? cookieStorageManagerSSR(cookies)
            : localStorageManager
        }
      >
        <Navbar cookies={cookies}>
          <Outlet />
        </Navbar>
      </ChakraProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  let cookies = "";

  return (
    <Document>
      <ChakraProvider
        theme={theme}
        colorModeManager={
          cookies.length > 0
            ? cookieStorageManagerSSR(cookies)
            : localStorageManager
        }
      >
        <Navbar cookies={cookies}>
          <NotFound />
        </Navbar>
      </ChakraProvider>
    </Document>
  );
}

export function CatchBoundary() {
  let cookies = "";

  return (
    <Document>
      <ChakraProvider
        theme={theme}
        colorModeManager={
          cookies.length > 0
            ? cookieStorageManagerSSR(cookies)
            : localStorageManager
        }
      >
        <Navbar cookies={cookies}>
          <NotFound />
        </Navbar>
      </ChakraProvider>
    </Document>
  );
}
