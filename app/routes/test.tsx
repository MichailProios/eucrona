import React from "react";
import { useLoaderData } from "@remix-run/react";
import { db } from "app/utils/db.server";
import type { LoaderFunction } from "@remix-run/cloudflare";

export let loader: LoaderFunction = async () => {
  const test = await db.test.findMany();

  return test;
};

export default function Test() {
  const { temp } = useLoaderData();

  return <div>test</div>;
}
