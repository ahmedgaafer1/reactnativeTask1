import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import TodoInput from "./src/components/TodoInput";
import FilterBar from "./src/components/FilterBar";
import TodoList from "./src/components/TodoList";

// editing space   task 1
export default function App() {
  const [todos, settodos] = useState([]);
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [filteration, setfilter] = useState("all");

  const handlesub = () => {
    if (!title.trim() || !desc.trim()) return;

    const newtodo = {
      id: uuid.v4(),
      title: title,
      desc: desc,
      active: "active",
    };

    settodos((prev) => {
      return [...prev, newtodo];
    });
    settitle("");
    setdesc("");
    setfilter("all");
  };

  const filtereddata = todos.filter((todo) => {
    if (filteration == "all") return true;
    return todo.active === filteration.toLowerCase();
  });

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await AsyncStorage.getItem("todos");
      if (data) settodos(JSON.parse(data));
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //we can also use 1 use effect instead of 2 bs hnst5dm flag to control which mounting and which updating

  const handleDelete = (id) => {
    settodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <TodoInput
        title={title}
        desc={desc}
        setTitle={settitle}
        setDesc={setdesc}
        handleSubmit={handlesub}
      />
      <View style={styles.dividerLine} />
      <FilterBar filteration={filteration} setFilter={setfilter} />
      <TodoList data={filtereddata} handleDelete={handleDelete} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 19,
  },
  dividerLine: {
    height: 1,
    width: "90%",
    backgroundColor: "#ccc",
    marginVertical: 15,
  },
});
