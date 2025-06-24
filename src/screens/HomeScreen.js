import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import uuid from "react-native-uuid";
import TodoInput from "../components/TodoInput";
import FilterBar from "../components/FilterBar";
import TodoList from "../components/TodoList";

export default function HomeScreen({ todos, setTodos }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [filteration, setFilter] = useState("all");

  const handleSubmit = () => {
    if (!title.trim() || !desc.trim()) return;
    const newTodo = {
      id: uuid.v4(),
      title,
      desc,
      active: "active",
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
    setDesc("");
    setFilter("all");
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, active: todo.active === "done" ? "active" : "done" }
          : todo
      )
    );
  };

  const filteredData = todos.filter((todo) =>
    filteration === "all" ? true : todo.active === filteration
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
      <FilterBar filteration={filteration} setFilter={setFilter} />
      <TodoList
        data={filteredData}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
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
