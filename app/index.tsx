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
  const [todos, setTodos] = useState(data);
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? colors.dark : colors.light;
  const styles = createStyles(theme, colorScheme);

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={newTodo}
          onChangeText={(val) => setNewTodo(val)}
          onSubmitEditing={() =>
            setTodos([
              ...todos,
              {
                id: Math.ceil(10000 * Math.random()),
                title: newTodo,
                completed: false,
              },
            ])
          }
        />
        <FlatList
          data={todos}
          keyExtractor={(todo) => todo.id.toString()}
          renderItem={({ item }) => (
            <Todo todo={item} deleteTodo={deleteTodo} />
          )}
        />
      </Container>
    </View>
  );
}

function createStyles(theme: Theme, colorScheme: ColorSchemeName) {
  return StyleSheet.create({
    container: {
      flexDirection: "column",
      width: "80%",
      paddingVertical: 30,
    },
    textInput: {
      borderWidth: 1,
      padding: 6,
      minWidth: "50%",
      height: 30,
      marginVertical: 20,
    },
  });
}
