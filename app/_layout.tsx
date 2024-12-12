import { colors } from "@/constants/colors";
import { Stack } from "expo-router";
import { Appearance } from "react-native";

// react-native also provides a SafeAreaView which we used in the other project (react-native-dave-gray)
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? colors.dark : colors.light;

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.headerBackground },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            title: "Todos",
            headerTitle: "Your todos",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
