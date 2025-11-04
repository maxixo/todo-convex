// src/components/FilterBar.tsx
import React from "react";
import styled from "styled-components/native";
import { useMutation } from "convex/react";
import { ThemeType } from "../styles/theme"; // Import your theme type

// Styled components with theme typing
const Bar = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10px;
  padding-horizontal: 8px;
`;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Right = styled.View`
  flex-direction: row;
  align-items: center;
`;

const FilterButton = styled.Pressable<{ active?: boolean }>`
  padding-vertical: 6px;
  padding-horizontal: 8px;
  border-radius: 6px;
  background-color: ${({ theme, active }: { theme: ThemeType; active?: boolean }) =>
    active ? theme.primary : "transparent"};
`;

const FilterText = styled.Text<{ active?: boolean }>`
  color: ${({ active, theme }: { active?: boolean; theme: ThemeType }) =>
    active ? "#FFF" : theme.muted};
  font-weight: 600;
`;

const CountText = styled.Text`
  color: ${({ theme }: { theme: ThemeType }) => theme.muted};
`;

export default function FilterBar({
  filter,
  setFilter,
  total,
  search,
  setSearch,
}: {
  filter: "all" | "active" | "completed";
  setFilter: (f: "all" | "active" | "completed") => void;
  total: number;
  search: string;
  setSearch: (s: string) => void;
}) {
  const clearCompleted = useMutation("clearCompletedTodos");

  const onClearCompleted = async () => {
    try {
      await clearCompleted();
    } catch (err) {
      console.warn("Failed to clear completed", err);
    }
  };

  return (
    <Bar>
      <Left>
        <CountText>{total} items</CountText>
      </Left>

      <Right>
        <FilterButton active={filter === "all"} onPress={() => setFilter("all")}>
          <FilterText active={filter === "all"}>All</FilterText>
        </FilterButton>

        <FilterButton active={filter === "active"} onPress={() => setFilter("active")}>
          <FilterText active={filter === "active"}>Active</FilterText>
        </FilterButton>

        <FilterButton active={filter === "completed"} onPress={() => setFilter("completed")}>
          <FilterText active={filter === "completed"}>Completed</FilterText>
        </FilterButton>

        <FilterButton onPress={onClearCompleted}>
          <FilterText>Clear Completed</FilterText>
        </FilterButton>
      </Right>
    </Bar>
  );
}
