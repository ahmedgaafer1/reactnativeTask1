import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
// import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  setFilter,
} from "../redux/todosSlice";
import TodoInput from "../components/TodoInput";
import FilterBar from "../components/FilterBar";
import TodoList from "../components/TodoList";

export const TODO_STATUS = {
  ACTIVE: "active",
  DONE: "done",
};

export default function HomeScreen() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  const { todos, filter } = useSelector((state) => state.todos);

  const handleSubmit = () => {
    if (!title.trim() || !desc.trim()) return;
    dispatch(
      addTodo({
        id: uuidv4(),
        title,
        desc,
        active: TODO_STATUS.ACTIVE,
      })
    );
    setTitle("");
    setDesc("");
  };

  const filteredData = todos.filter((todo) =>
    filter === "all" ? true : todo.active === filter
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <TodoInput
        title={title}
        desc={desc}
        setTitle={setTitle}
        setDesc={setDesc}
        handleSubmit={handleSubmit}
      />
      <View style={styles.dividerLine} />
      <FilterBar
        filteration={filter}
        setFilter={(val) => dispatch(setFilter(val))}
      />
      <TodoList
        data={filteredData}
        handleDelete={(id) => dispatch(deleteTodo(id))}
        handleToggle={(id) => dispatch(toggleTodo(id))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  dividerLine: {
    height: 1,
    width: "90%",
    backgroundColor: "#ccc",
    marginVertical: 15,
  },
});
