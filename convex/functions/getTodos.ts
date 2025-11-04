import { query } from "./../_generated/server";

export const getTodos = query(async ({ db }) => {
  return await db.query("todos").collect();
});
