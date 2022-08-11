import type { EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { injectStyles, createStylesServer } from "@mantine/remix";
import { getCssText, NextUIProvider } from "@nextui-org/react";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <NextUIProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NextUIProvider>
  ).replace(/<\/head>/, `<style id="stitches">${getCssText()}</style></head>`);

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
