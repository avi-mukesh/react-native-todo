import { colors, Theme } from "@/constants/colors";
import {
  Appearance,
  ColorSchemeName,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { data } from "@/data/todos";
import { useState, useEffect } from "react";
import Todo from "@/components/Todo";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { useTheme } from "@/context/ThemeContext";
import Octicons from "@expo/vector-icons/Octicons";
import Animated, { LinearTransition } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Index() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const { colorScheme, setColorScheme, theme } = useTheme();
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;

  const styles = createStyles(theme, colorScheme);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await AsyncStorage.getItem("TodoApp");
        const storageTodos = json !== null ? JSON.parse(json) : null;

        if (storageTodos && storageTodos.length > 0) {
          setTodos(storageTodos.sort((a: Todo, b: Todo) => b.id - a.id));
        } else {
          setTodos(data.sort((a, b) => b.id - a.id));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem("TodoApp", jsonValue);
      } catch (e) {
        console.error(e);
      }
    };
    storeData();
  }, [todos]);

  const [loaded, error] = useFonts({ Inter_500Medium });
  if (!loaded && !error) return null;

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id !== id ? todo : { ...todo, completed: !todo.completed }
      )
    );
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        {
          id: todos.length > 0 ? todos[0].id + 1 : 1,
          title: newTodo.trim(),
          completed: false,
        },
        ...todos,
      ]);
      setNewTodo("");
    }
  };

  return (
    <Container style={styles.container}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add todo..."
          placeholderTextColor="gray"
          style={styles.textInput}
          value={newTodo}
          onChangeText={(val) => setNewTodo(val)}
          onSubmitEditing={addTodo}
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
      <Animated.FlatList
        data={todos}
        keyExtractor={(todo) => todo.id.toString()}
        renderItem={({ item }) => (
          <Todo todo={item} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
        )}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag" // when we swipe up to scroll, it dismisses the keyboard
      />
    </Container>
  );
}

function createStyles(theme: Theme, colorScheme: ColorSchemeName) {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      width: "100%",
      paddingVertical: 30,
      textAlign: "center",
      backgroundColor: theme.background,
      color: theme.text,
    },
    inputContainer: {
      width: "50%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      flexDirection: "row",
      alignItems: "center",
    },
    textInput: {
      borderWidth: 1,
      borderColor: theme.text,
      padding: 6,
      height: 40,
      marginBottom: 20,
      borderRadius: 5,
      fontSize: 18,
      marginHorizontal: 10,
      fontFamily: "Inter_500Medium",
      width: "100%",
      color: theme.text,
    },
  });
}
