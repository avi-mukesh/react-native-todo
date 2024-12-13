import { createContext, useContext, useState } from "react";
import { Appearance } from "react-native";
import { colors, type Theme } from "@/constants/colors";

export const ThemeContext = createContext<{
  colorScheme: "light" | "dark" | null | undefined;
  setColorScheme: React.Dispatch<
    React.SetStateAction<"light" | "dark" | null | undefined>
  >;
  theme: Theme;
}>({
  colorScheme: "light",
  setColorScheme: () => {},
  theme: colors.light,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  const theme = colorScheme === "dark" ? colors.dark : colors.light;

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
