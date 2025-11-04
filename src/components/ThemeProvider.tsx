// src/components/ThemeProvider.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider as SCThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme, ThemeType } from "../styles/theme";

const THEME_KEY = "app_theme_mode";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => Promise<void>;
  animValue: Animated.Value;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleTheme: async () => {},
  animValue: new Animated.Value(0),
});

export const useAppTheme = () => useContext(ThemeContext);

export const AnimatedThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>("light");
  const animValue = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_KEY);
        if (stored === "dark") {
          setMode("dark");
          animValue.setValue(1);
        }
      } catch {
        // ignore storage errors
      }
    })();
  }, [animValue]);

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: mode === "dark" ? 1 : 0,
      duration: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [mode, animValue]);

  const toggleTheme = async () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    try {
      await AsyncStorage.setItem(THEME_KEY, next);
    } catch {
      // ignore write errors
    }
  };

  const theme: ThemeType = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, animValue }}>
      <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  );
};
