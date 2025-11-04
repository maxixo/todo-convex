// App.tsx
import React from "react";
import { StatusBar, Text, View, ActivityIndicator } from "react-native";
import { ConvexProvider } from "convex/react";
import { convexClient } from "./src/convex/client";
import { AnimatedThemeProvider } from "./src/components/ThemeProvider";
import { Header } from "./src/components/Header";
import TodoInput from "./src/components/TodoInput";
import TodoList from "./src/components/TodoList";
import styled from "styled-components/native";
import { ThemeType } from "./src/styles/theme";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.background};
`;

const ContentWrap = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
`;

const CardPlaceholder = styled.View`
  width: 100%;
  max-width: 760px;
  background-color: ${({ theme }:{theme: any}) => theme.surface};
  border-radius: 12px;
  padding: 12px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export default function App() {
  return (
    <ConvexProvider client={convexClient}>
      <AnimatedThemeProvider>
        <Container>
          <StatusBar barStyle="dark-content" />
          <Header />
          <ContentWrap>
            <CardPlaceholder>
              <Text>Hello Todo App 👋</Text>

              <TodoInput />
              <TodoList />
            </CardPlaceholder>
          </ContentWrap>
        </Container>
      </AnimatedThemeProvider>
    </ConvexProvider>
  );
}
