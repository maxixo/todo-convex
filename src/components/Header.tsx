// src/components/Header.tsx
import React from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "styled-components/native";

const Container = styled.View`
  padding-top: 28px;
  padding-bottom: 24px;
  padding-horizontal: 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 36px;
  letter-spacing: 8px;
  font-weight: 700;
  color: ${({ theme }) => theme.surface};
`;

const HeaderInner = styled.View`
  width: 100%;
  max-width: 760px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Header: React.FC = () => {
  const theme: any = useTheme();
  return (
    <LinearGradient
      colors={theme.headerGradient}
      start={[0, 0]}
      end={[1, 0]}
      style={{ width: "100%" }}
    >
      <Container>
        <HeaderInner>
          <Title accessibilityRole="header">TODO</Title>
          <ThemeToggle />
        </HeaderInner>
      </Container>
    </LinearGradient>
  );
};
