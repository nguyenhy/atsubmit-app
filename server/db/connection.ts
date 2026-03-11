import { Client } from "pg";
import { MainContext } from "@server/types";

export const createClient = async (c: MainContext) => {
  const client = new Client({ connectionString: c.env.DB_URL });
  await client.connect();

  return client;
};
