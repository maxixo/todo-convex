// src/components/TodoInput.tsx
import React, { useState } from "react";
import { Alert, Keyboard } from "react-native";
import styled from "styled-components/native";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ThemeType } from "../styles/theme";

// Styled components
const Container = styled.View`
  width: 100%;
  max-width: 760px;
  align-self: center;
  padding: 12px;
`;

const InputRow = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.inputBg};
  padding: 14px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.border};
  color: ${({ theme }: { theme: ThemeType }) => theme.text};
  font-size: 16px;
`;

const AddButton = styled.Pressable`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.primary};
  padding-vertical: 10px;
  padding-horizontal: 14px;
  border-radius: 8px;
`;

const AddText = styled.Text`
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
`;

// ----------------------
// Types
// ----------------------
type AddTodoPayload = {
  title: string;
  description?: string;
  dueDate?: string;
};

export default function TodoInput() {
  // Using the correct mutation reference
  const addTodo = useMutation(api.todos.addTodo);
  
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const handleAdd = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Please provide a title for the todo.");
      return;
    }

    const payload: AddTodoPayload = {
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate.trim() || undefined,
    };

    // Clear inputs for optimistic UI
    setTitle("");
    setDescription("");
    setDueDate("");
    Keyboard.dismiss();

    try {
      await addTodo(payload);
    } catch (error) {
      console.error("Add todo failed:", error);
      Alert.alert("Error", "Failed to add todo. Please try again.");
    }
  };

  return (
    <Container>
      <InputRow>
        <StyledInput
          placeholder="Create a new todo..."
          placeholderTextColor="#94A3B8"
          value={title}
          onChangeText={setTitle}
          returnKeyType="done"
          accessibilityLabel="New todo title"
        />
        <AddButton onPress={handleAdd} accessibilityRole="button">
          <AddText>Add</AddText>
        </AddButton>
      </InputRow>

      <InputRow style={{ marginTop: 8 }}>
        <StyledInput
          placeholder="Description (optional)"
          placeholderTextColor="#94A3B8"
          value={description}
          onChangeText={setDescription}
        />
      </InputRow>

      <InputRow style={{ marginTop: 8 }}>
        <StyledInput
          placeholder="Due date (YYYY-MM-DD) (optional)"
          placeholderTextColor="#94A3B8"
          value={dueDate}
          onChangeText={setDueDate}
        />
      </InputRow>
    </Container>
  );
}
