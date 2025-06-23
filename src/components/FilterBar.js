import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function FilterBar({ filteration, setFilter }) {
  return (
    <View style={styles.filterContainer}>
      {["all", "active", "done"].map((status) => (
        <TouchableOpacity
          key={status}
          style={filteration === status ? styles.activeFilterBtn : styles.filterBtn}
          onPress={() => setFilter(status)}
        >
          <Text style={filteration === status ? styles.activeFilterText : styles.filterText}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
