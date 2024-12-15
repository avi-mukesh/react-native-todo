import { colors } from "@/constants/colors";
import { Stack } from "expo-router";
import { Appearance } from "react-native";

// react-native also provides a SafeAreaView which we used in the other project (react-native-dave-gray)
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  // const theme = colorScheme === "dark" ? colors.dark : colors.light;

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false, statusBarHidden: true }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="todos/[id]" />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
