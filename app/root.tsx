import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { NextUIProvider, Container, Text, css } from "@nextui-org/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Michail Proios",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <NextUIProvider>
      <Document>
        <Layout>
          <Outlet />
        </Layout>
      </Document>
    </NextUIProvider>
  );
}

interface DocumentProps {
  children: any;
}

function Document({ children }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
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

interface LayoutProps {
  children: any;
}

function Layout({ children }: LayoutProps) {
  // const links = [
  //   {
  //     link: "/overview",
  //     label: "Overview",
  //   },
  //   {
  //     link: "/services",
  //     label: "Services",
  //   },
  //   {
  //     link: "/about",
  //     label: "About",
  //   },
  //   {
  //     link: "/blog",
  //     label: "Blog",
  //   },
  // ];

  return { children };
}
// How NextUIProvider should be used on CatchBoundary
export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <NextUIProvider>
        <Container>
          <Text h1 color="warning" css={{ textAlign: "center" }}>
            [CatchBoundary]: {caught.status} {caught.statusText}
          </Text>
        </Container>
      </NextUIProvider>
    </Document>
  );
}

// How NextUIProvider should be used on ErrorBoundary
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <NextUIProvider>
        <Container>
          <Text h1 color="error" css={{ textAlign: "center" }}>
            [ErrorBoundary]: There was an error: {error.message}
          </Text>
        </Container>
      </NextUIProvider>
    </Document>
  );
}
