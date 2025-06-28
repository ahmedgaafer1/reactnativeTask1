import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function StatisticsScreen() {
  const todos = useSelector((state) => state.todos.todos);
  const total = todos.length;
  const done = todos.filter((t) => t.active === "done").length;
  const active = todos.filter((t) => t.active === "active").length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Todo Statistics</Text>
      <View style={styles.card}>
        <Text style={styles.label}>
          Total Todos: <Text style={styles.value}>{total}</Text>
        </Text>
        <Text style={styles.label}>
          Done: <Text style={styles.value}>{done}</Text>
        </Text>
        <Text style={styles.label}>
          Active: <Text style={styles.value}>{active}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#f1f1f1",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    elevation: 4,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  value: {
    fontWeight: "bold",
    color: "#2e86de",
  },
});
