import { query, mutation } from "./../_generated/server";
import { v } from "convex/values";




export const listTodos = query({
  args: {},
  handler: async (ctx) => {
    // ✅ Correct Convex query syntax
    return await ctx.db
      .query("todos")
      .withIndex("by_order") // reference the index you defined
      .order("asc")          // order ascending
      .collect();
  },
});
export const addTodo = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("todos").collect();
    const order = existing.length;

    await ctx.db.insert("todos", {
      title: args.title,
      description: args.description ?? "",
      dueDate: args.dueDate ?? null,
      isDone: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      order,
    });
  },
});

export const reorderTodos = mutation({
  args: {
    updates: v.array(v.object({
      id: v.id("todos"),
      order: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    for (const { id, order } of args.updates) {
      await ctx.db.patch(id, { order });
    }
  },
});