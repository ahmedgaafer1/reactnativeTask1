import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function TodoList({ data, handleDelete, handleToggle }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      style={{ width: "90%", marginTop: 20 }}
     renderItem={({ item }) => (
  <View style={styles.item}>
    <TouchableOpacity onPress={() => handleToggle(item.id)}>
      <Ionicons
        name={item.active === "done" ? "checkmark-circle" : "ellipse-outline"}
        size={24}
        color={item.active === "done" ? "green" : "gray"}
        style={{ marginRight: 10 }}
      />
    </TouchableOpacity>
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.desc}</Text>
    </View>
    <TouchableOpacity onPress={() => handleDelete(item.id)}>
      <Ionicons name="trash-outline" size={24} color="red" />
    </TouchableOpacity>
  </View>
)}

    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
