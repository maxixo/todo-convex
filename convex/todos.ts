// convex/todos.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ✅ Query to list all todos
export const listTodos = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("todos")
      // ✅ use index before ordering by a field
      .withIndex("by_order")
      .order("asc")
      .collect();
  },
});

// ✅ Query to get a single todo by ID
export const getTodo = query({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// ✅ Mutation to add a new todo
export const addTodo = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get the count of existing todos to determine order
    const existing = await ctx.db.query("todos").collect();
    const order = existing.length;

    const now = Date.now();

    const todoId = await ctx.db.insert("todos", {
      title: args.title,
      description: args.description ?? "",
      dueDate: args.dueDate ?? null,
      isDone: false,
      order,
      createdAt: now,
      updatedAt: now,
    });

    return todoId;
  },
});

// ✅ Mutation to update a todo
export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    dueDate: v.optional(v.union(v.string(), v.null())),
    isDone: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// ✅ Mutation to toggle todo completion status
export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");

    await ctx.db.patch(args.id, {
      isDone: !todo.isDone,
      updatedAt: Date.now(),
    });
  },
});

// ✅ Mutation to delete a todo
export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ✅ Mutation to reorder todos
export const reorderTodos = mutation({
  args: {
    updates: v.array(
      v.object({
        id: v.id("todos"),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Update each todo with its new order
    for (const { id, order } of args.updates) {
      await ctx.db.patch(id, { 
        order,
        updatedAt: Date.now(),
      });
    }
  },
});

// ✅ Mutation to clear all completed todos
export const clearCompleted = mutation({
  args: {},
  handler: async (ctx) => {
    const completedTodos = await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("isDone"), true))
      .collect();

    for (const todo of completedTodos) {
      await ctx.db.delete(todo._id);
    }

    return completedTodos.length;
  },
});