// src/styles/theme.ts

export interface ThemeType {
  background: string;
  text: string;
  border: string;
  inputBg: string;
  primary: string;
  muted: string;
  danger: string;
  shadow: string;
}

export const lightTheme: ThemeType = {
  background: "#F8FAFC",
  text: "#0F172A",
  muted: "#94A3B8",
  inputBg: "#FFFFFF",
  border: "#E6E9EE",
  primary: "#6366F1",
  danger: "#EF4444",
  shadow: "rgba(16,24,40,0.08)",
};

export const darkTheme: ThemeType = {
  background: "#0F172A",
  text: "#F8FAFC",
  border: "#334155",
  inputBg: "#1E293B",
  primary: "#6366F1",
  muted: "#64748B",
  danger: "#EF4444",
  shadow: "rgba(16,24,40,0.08)",
};
