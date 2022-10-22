import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";

import { useCatch } from "@remix-run/react";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/cloudflare";

import { ServerStyleContext, ClientStyleContext } from "~/styles/context";

import Layout from "app/components/Layout";
import Catch from "~/components/Catch";

import theme from "app/styles/theme";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Eucrona",
  viewport: "width=device-width,initial-scale=1",
});

export let links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon/favicon.ico",
    },
  ];
};

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
      <html
        lang="en"
        style={{
          height: "100%",
          width: "100%",
          position: "fixed",
          overflow: "hidden",
        }}
      >
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
        <body style={{ height: "100%", overflow: "overlay" }}>
          {children}
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        </body>
      </html>
    );
  }
);

//
export default function App() {
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Layout>
          <Outlet />
        </Layout>
      </ChakraProvider>
    </Document>
  );
}

// export function ErrorBoundary({ error }: { error: Error }) {
//   return (
//     <Document>
//       <ChakraProvider theme={theme}>
//         <Layout>
//           <Catch caught={error} />
//         </Layout>
//       </ChakraProvider>
//     </Document>
//   );
// }

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Layout>
          <Catch caught={caught} />
        </Layout>
      </ChakraProvider>
    </Document>
  );
}
