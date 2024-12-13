import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  ColorSchemeName,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/context/ThemeContext";
import { Theme } from "@/constants/colors";

type PropsType = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

const Todo = ({ todo, deleteTodo, toggleTodo }: PropsType) => {
  const { theme, colorScheme } = useTheme();
  let styles = createStyles(theme, colorScheme);

  return (
    <View style={styles.todoRow}>
      <View style={styles.todoTextContainer}>
        <Text
          style={[
            {
              textDecorationLine: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : "black",
            },
            styles.todoText,
          ]}
        >
          {todo.title}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => toggleTodo(todo.id)}>
          <MaterialCommunityIcons
            name={todo.completed ? "check-circle" : "check-circle-outline"}
            size={28}
            color={theme.text}
          />
        </Pressable>
        <Pressable onPress={() => deleteTodo(todo.id)}>
          <MaterialCommunityIcons name="trash-can" size={28} color="red" />
        </Pressable>
      </View>
    </View>
  );
};

export default Todo;

function createStyles(theme: Theme, colorScheme: ColorSchemeName) {
  return StyleSheet.create({
    todoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      padding: 5,
      borderRadius: 8,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: theme.text,
      marginVertical: 4,
      width: 800,
      maxWidth: "90%",
      marginHorizontal: "auto",
    },
    buttonContainer: {
      flexDirection: "row",
      alignContent: "center",
      gap: 20,
      marginTop: 5,
    },
    todoTextContainer: {},
    todoText: {
      padding: 10,
      fontSize: 16,
      fontFamily: "Inter_500Medium",
      color: theme.text,
    },
  });
}
