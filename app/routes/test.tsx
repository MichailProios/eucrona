import React from "react";
import { useLoaderData } from "@remix-run/react";
import { db } from "app/utils/db.server";

export let loader = async () => {
  const test = await db.test.findMany({ take: 100 });

  return test;
};

export default function Test() {
  const { temp } = useLoaderData();

  console.log(temp);
  return <div>test</div>;
}
