import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React, { useState } from "react";
import { IconSymbol } from "./ui/IconSymbol";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
  return (
    <View style={styles.todoRow}>
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
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => toggleTodo(todo.id)}>
          <MaterialCommunityIcons
            name={todo.completed ? "check-circle" : "check-circle-outline"}
            size={28}
            color="black"
          />
        </Pressable>
        <Pressable onPress={() => deleteTodo(todo.id)}>
          <MaterialCommunityIcons name="trash-can" size={28} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  todoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginHorizontal: 3,
    padding: 3,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignContent: "center",
    gap: 20,
    marginTop: 5,
  },
  todoText: {
    padding: 10,
    fontSize: 16,
  },
  tickButton: {},
});
