import { colors, Theme } from "@/constants/colors";
import {
  Appearance,
  ColorSchemeName,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { data } from "@/data/todos";
import { useState } from "react";
import Todo from "@/components/Todo";
import { ThemeContext } from "@react-navigation/native";

export default function Index() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? colors.dark : colors.light;
  const styles = createStyles(theme, colorScheme);

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
    // <View
    //   style={{
    //     flex: 1,
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    <Container style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add todo..."
          placeholderTextColor="#333"
          style={styles.textInput}
          value={newTodo}
          onChangeText={(val) => setNewTodo(val)}
          onSubmitEditing={addTodo}
        />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(todo) => todo.id.toString()}
        renderItem={({ item }) => (
          <Todo todo={item} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
        )}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </Container>
    // </View>
  );
}

function createStyles(theme: Theme, colorScheme: ColorSchemeName) {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginVertical: 30,
    },
    inputContainer: {
      width: "100%",
      maxWidth: 1024,
      minWidth: 0,
    },
    textInput: {
      borderWidth: 1,
      padding: 6,
      height: 40,
      marginBottom: 20,
      borderRadius: 5,
      fontSize: 18,
      marginHorizontal: 10,
    },
  });
}
