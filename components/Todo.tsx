import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React, { useState } from "react";
import { IconSymbol } from "./ui/IconSymbol";

type PropsType = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
  deleteTodo: (id: number) => void;
};

const Todo = ({ todo, deleteTodo }: PropsType) => {
  const [completed, setCompleted] = useState<boolean>(todo.completed);

  return (
    <View style={styles.todoRow}>
      <Text
        style={[
          {
            textDecorationLine: completed ? "line-through" : "none",
          },
          styles.todoText,
        ]}
      >
        {todo.title}
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => setCompleted(!completed)}>
          <IconSymbol
            size={28}
            name={completed ? "cross.circle.fill" : "cross.circle"}
            color={"black"}
          />
        </Pressable>
        <Pressable onPress={() => deleteTodo(todo.id)}>
          <IconSymbol size={28} name="trash.circle" color={"black"} />
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
    marginHorizontal: 3,
    padding: 3,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  todoText: {
    padding: 10,
  },
  tickButton: {},
});
