// convex/functions/deleteTodo.ts
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, { id }) => {
    const todo = await ctx.db.get(id);
    if (!todo) throw new Error("Todo not found");

    await ctx.db.delete(id);
  },
});

export default deleteTodo;
