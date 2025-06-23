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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 19 }}>
        Todo App{" "}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={title}
        onChangeText={(val) => {
          settitle(val);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Description"
        value={desc}
        onChangeText={(val) => {
          setdesc(val);
        }}
      />
      <TouchableOpacity
        style={styles.submitBtn}
        activeOpacity={0.7}
        onPress={handlesub}
      >
        <Text style={{ ...styles.text, fontWeight: "bold" }}>Submit </Text>
      </TouchableOpacity>
      <View style={styles.dividerLine} /> {/*   horizontal line */}
      <View style={styles.filterContainer}>
       <TouchableOpacity
  style={filteration === "all" ? styles.activeFilterBtn : styles.filterBtn}
  activeOpacity={0.7}
  onPress={() => setfilter("all")}
>
  <Text style={filteration === "all" ? styles.activeFilterText : styles.filterText}>
    All
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={filteration === "active" ? styles.activeFilterBtn : styles.filterBtn}
  activeOpacity={0.7}
  onPress={() => setfilter("active")}
>
  <Text style={filteration === "active" ? styles.activeFilterText : styles.filterText}>
    Active
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={filteration === "done" ? styles.activeFilterBtn : styles.filterBtn}
  activeOpacity={0.7}
  onPress={() => setfilter("done")}
>
  <Text style={filteration === "done" ? styles.activeFilterText : styles.filterText}>
    Done
  </Text>
</TouchableOpacity>
      </View>
      <FlatList
        data={filtereddata}
        keyExtractor={(item) => item.id}
        style={{ width: "90%", marginTop: 20 }}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              backgroundColor: "#fff",
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.title}
            </Text>
            <Text>{item.desc}</Text>
          </View>
        )}
      />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "90%",
    marginVertical: 10,
    height: 50,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  submitBtn: {
    width: "50%",
    backgroundColor: "#2e86de",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: "#ffffff",
    fontSize: 18,
    textTransform: "uppercase",
  },
  dividerLine: {
    height: 1,
    width: "90%",
    backgroundColor: "#ccc",
    marginVertical: 15,
  },
  filterContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  filterBtn: {
    width: "30%",
    backgroundColor: "#ffffff",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#2e86de",
  },
  filterText: {
    color: "#2e86de",
    fontSize: 15,
  },
  activeFilterBtn: {
    width: "30%",
    backgroundColor: "#2e86de",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#2e86de",
  },
  activeFilterText: {
    color: "white",
    fontSize: 15,
  },
  todosContainer: {
    marginTop: 10,
  },
  doneTodo: {
    textDecorationLine: "line-through",
    color: "#888",
  },
});
