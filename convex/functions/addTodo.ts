// src/convex/functions/addTodo.ts
import { mutation } from "../_generated/server";
import { v } from "convex/values";

// Input validation schema for safety
export const addTodo = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get all todos to determine next order index
    const existing = await ctx.db.query("todos").collect();
    const order = existing.length ? existing.length + 1 : 1;

    const now = Date.now(); // Get the current timestamp

    const newTodo = {
      title: args.title,
      description: args.description ?? "", // Default to empty string if description is missing
      dueDate: args.dueDate ?? null, // Default to null if dueDate is missing
      isDone: false, // Equivalent to `isDone`, marking it as not completed
      createdAt: now, // Set the current timestamp as createdAt
      updatedAt: now, // Optionally set updatedAt to now (if you want to track updates)
      order, // Assign the calculated order index
    };

    // Insert the new todo into the "todos" table
    await ctx.db.insert("todos", newTodo);
  },
});

export default addTodo;
