// src/components/TodoList.tsx
import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styled from "styled-components/native";
import { useQuery, useMutation } from "convex/react";
import TodoItem from "./TodoItem";
import FilterBar from "./FilterBar";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

// ✅ Styled container
const Container = styled.View`
  flex: 1;
  width: 100%;
  max-width: 760px;
  align-self: center;
  margin-top: 12px;
`;

// ✅ Todo type based on Convex schema
export type Todo = {
  _id: Id<"todos">;
  _creationTime: number;
  title: string;
  description?: string;
  dueDate?: string | null;
  isDone: boolean;
  order?: number;
  createdAt?: number;
  updatedAt?: number;
};

export default function TodoList() {
  // ✅ Use the correct Convex query reference (adjust if your folder is `functions`)
  const todos = useQuery(api.todos.listTodos) ?? []; // default to []

  // ✅ Use typed mutation reference
  const reorder = useMutation(api.todos.reorderTodos);

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [search, setSearch] = useState("");

  
  // ✅ Ensure todos is always an array
  const todoList = Array.isArray(todos) ? todos : [];


  // ✅ Memoized filtering
  const filtered = useMemo(() => {
    let list = [...todos];

    // Apply search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((t) =>
        (t.title + " " + (t.description || "")).toLowerCase().includes(q)
      );
    }

    // Apply filter
    if (filter === "active") list = list.filter((t) => !t.isDone);
    if (filter === "completed") list = list.filter((t) => t.isDone);

    return list;
  }, [todos, filter, search]);

  // ✅ Loading state
  if (todos === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={{ marginTop: 12, color: "#94A3B8" }}>Loading todos...</Text>
      </View>
    );
  }

  // ✅ Empty state
  if (filtered.length === 0) {
    return (
      <Container>
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          total={todos.length}
          search={search}
          setSearch={setSearch}
        />
        <Text
          style={{
            textAlign: "center",
            marginTop: 36,
            color: "#94A3B8",
            fontSize: 16,
          }}
        >
          {search.trim() || filter !== "all"
            ? "No matching todos found"
            : "No todos yet — add your first one!"}
        </Text>
      </Container>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
const onReorderSave = async (newOrder: Todo[] = []) => {
  if (!Array.isArray(newOrder)) return;
  await reorder({
    updates: newOrder.map((t, idx) => ({ id: t._id, order: idx })),
  });
};


  // ✅ Main render
  return (
    <Container>
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        total={todos.length}
        search={search}
        setSearch={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TodoItem todo={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
