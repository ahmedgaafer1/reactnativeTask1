import React from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function TodoInput({ title, desc, setTitle, setDesc, handleSubmit }) {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Description"
        value={desc}
        onChangeText={setDesc}
      />
      <TouchableOpacity style={styles.submitBtn} activeOpacity={0.7} onPress={handleSubmit}>
        <Text style={{ ...styles.text, fontWeight: "bold" }}>Submit</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
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
});
