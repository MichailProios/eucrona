import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { MantineProvider, AppShell } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import { AppHeader } from "app/components/AppHeader/AppHeader";
import { AppFooter } from "app/components/AppFooter/AppFooter";
// import { theme } from "./theme";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Michail Proios",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

interface DocumentProps {
  children: any;
}

function Document({ children }: DocumentProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <head>
          <Meta />
          <Links />
          <StylesPlaceholder />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        </body>
      </html>
    </MantineProvider>
  );
}

interface LayoutProps {
  children: any;
}

function Layout({ children }: LayoutProps) {
  const links = [
    {
      link: "/overview",
      label: "Overview",
    },
    {
      link: "/services",
      label: "Services",
    },
    {
      link: "/about",
      label: "About",
    },
    {
      link: "/blog",
      label: "Blog",
    },
  ];

  return (
    <AppShell
      padding={0}
      header={<AppHeader links={links} />}
      footer={<AppFooter links={links} />}
    >
      {children}
    </AppShell>
  );
}

interface ErrorBoundaryProps {
  error: { message: string };
}

export function ErrorBoundary({ error }: ErrorBoundaryProps) {
  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  );
}
