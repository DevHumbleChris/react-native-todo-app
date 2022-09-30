import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";

const TodoItem = ({ id, todoItem }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View style={styles.todo}>
      <Checkbox
        status={isChecked ? "checked" : "unchecked"}
        onPress={() => setIsChecked(!isChecked)}
      />
      <Text
        style={[
          styles.todoText,
          { textDecorationLine: isChecked ? "line-through" : "none" },
        ]}
      >
        {" "}
        {todoItem.title}{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  todoText: {
    paddingHorizontal: 5,
    fontSize: 16,
  },
});

export default TodoItem;
