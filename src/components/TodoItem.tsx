// src/components/TodoItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

// ✅ Proper Todo type that matches the schema
export type Todo = {
  _id: Id<"todos">;
  _creationTime: number;
  title: string;
  description: string;
  dueDate: string | null;
  isDone: boolean;
  order: number;
  createdAt: number;
  updatedAt: number;
};

const ItemContainer = styled.View`
  padding: 16px;
  background-color: white;
  margin-bottom: 8px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
`;

const Checkbox = styled.TouchableOpacity<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${(props: { checked: boolean }) => (props.checked ? "#10B981" : "#CBD5E1")};
  background-color: ${(props: { checked: boolean }) => (props.checked ? "#10B981" : "transparent")};
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  flex: 1;
`;

const Title = styled.Text<{ done: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props: { done: boolean }) => (props.done ? "#94A3B8" : "#1E293B")};
  text-decoration-line: ${(props: { done: boolean }) => (props.done ? "line-through" : "none")};
`;

const Description = styled.Text`
  font-size: 14px;
  color: #64748B;
  margin-top: 4px;
`;

const DueDate = styled.Text`
  font-size: 12px;
  color: #94A3B8;
  margin-top: 4px;
`;

const DeleteButton = styled.TouchableOpacity`
  padding: 8px;
  margin-left: 8px;
`;

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const handleToggle = async () => {
    try {
      await toggleTodo({ id: todo._id });
    } catch (err) {
      console.warn("Failed to toggle todo", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo({ id: todo._id });
    } catch (err) {
      console.warn("Failed to delete todo", err);
    }
  };

  return (
    <ItemContainer>
      <Checkbox checked={todo.isDone} onPress={handleToggle}>
        {todo.isDone && <Text style={{ color: "white", fontSize: 16 }}>✓</Text>}
      </Checkbox>
      
      <Content>
        <Title done={todo.isDone}>{todo.title}</Title>
        {todo.description && (
          <Description>{todo.description}</Description>
        )}
        {todo.dueDate && (
          <DueDate>Due: {new Date(todo.dueDate).toLocaleDateString()}</DueDate>
        )}
      </Content>

      <DeleteButton onPress={handleDelete}>
        <Text style={{ fontSize: 18, color: "#EF4444" }}>🗑️</Text>
      </DeleteButton>
    </ItemContainer>
  );
}