
// src/components/ThemeToggle.tsx
import React from "react";
import { TouchableOpacity } from "react-native";
import { useAppTheme } from "./ThemeProvider"; // Corrected import path
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons"; // Assuming Feather icons are available

const IconContainer = styled.View`
  padding: 6px;
`;

export const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useAppTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} accessibilityRole="button" accessibilityLabel="Toggle theme">
      <IconContainer>
        {mode === "dark" ? (
          <Feather name="sun" size={24} color="white" />
        ) : (
          <Feather name="moon" size={24} color="white" />
        )}
      </IconContainer>
    </TouchableOpacity>
  );
};
