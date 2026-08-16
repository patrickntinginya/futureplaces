import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { categories } from "../../db/schema.js";

export default async (req: Request) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const rows = await db.select().from(categories);
    return Response.json(rows);
  } catch (err) {
    return Response.json({ error: "Failed to load categories" }, { status: 500 });
  }
};

export const config: Config = {
  path: "/api/categories",
};
