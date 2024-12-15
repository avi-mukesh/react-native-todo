import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ColorSchemeName,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { colors, Theme } from "@/constants/colors";
import { type TodoType } from "@/data/todos";
import { StatusBar } from "expo-status-bar";

export default function EditScreen() {
  const { id } = useLocalSearchParams();
  const [todo, setTodo] = useState<TodoType>();
  const router = useRouter();
  const { colorScheme, setColorScheme, theme } = useTheme();
  const styles = createStyles(theme, colorScheme);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storageTodos =
          jsonValue !== null ? (JSON.parse(jsonValue) as TodoType[]) : null;
        if (storageTodos && storageTodos.length > 0) {
          const specificTodo = storageTodos.find(
            (todo) => todo.id.toString() === id
          );
          setTodo(specificTodo);
        }
      } catch (e) {
        console.error(e);
      }
      let idNum = Number(id);
    };
    fetchData(Array.isArray(id) ? id[0] : id);
  }, []);

  const [loaded, error] = useFonts({ Inter_500Medium });
  if (!loaded && !error) return null;

  const handleSave = async () => {
    try {
      const savedTodo = { ...todo, title: todo!.title };
      console.log(savedTodo);
      const jsonValue = await AsyncStorage.getItem("TodoApp");
      const storageTodos =
        jsonValue !== null ? (JSON.parse(jsonValue) as TodoType[]) : null;

      if (storageTodos && storageTodos.length > 0) {
        const otherTodos = storageTodos.filter(
          (todo) => todo.id != savedTodo.id
        );
        const allTodos = [...otherTodos, savedTodo];
        console.log(allTodos);
        await AsyncStorage.setItem("TodoApp", JSON.stringify(allTodos));
      } else {
        await AsyncStorage.setItem("TodoApp", JSON.stringify([savedTodo]));
      }
      router.navigate(`../`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {todo ? (
        <View style={styles.inputContainer}>
          <TextInput
            value={todo?.title}
            style={styles.input}
            placeholder="Edit todo"
            placeholderTextColor="gray"
            onChangeText={(text) => setTodo({ ...todo, title: text })}
          />
          <Pressable
            onPress={() =>
              setColorScheme(colorScheme === "light" ? "dark" : "light")
            }
          >
            <Octicons
              name={colorScheme === "dark" ? "moon" : "sun"}
              size={24}
              color={theme.text}
            />
          </Pressable>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={styles.inputContainer}>
        <Pressable onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
        <Pressable
          onPress={() => router.navigate("../")}
          style={[styles.saveButton, { backgroundColor: "red" }]}
        >
          <Text style={[styles.saveButtonText, { color: "white" }]}>
            Cancel
          </Text>
        </Pressable>
      </View>
      {/* <StatusBar style={colorScheme === "dark" ? "light" : "dark"} /> */}
    </SafeAreaView>
  );
}

function createStyles(theme: Theme, colorScheme: ColorSchemeName) {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      gap: 6,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    input: {
      flex: 1,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      fontFamily: "Inter_500Medium",
      minWidth: 0,
      color: theme.text,
    },
    saveButton: {
      backgroundColor: colorScheme === "dark" ? "whitesmoke" : "navy",
      borderRadius: 5,
      padding: 10,
    },
    saveButtonText: {
      fontSize: 18,
      color: colorScheme === "dark" ? "black" : "white",
    },
  });
}
