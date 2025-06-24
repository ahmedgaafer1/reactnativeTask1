import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import StatisticsScreen from "./src/screens/StatisticsScreen";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await AsyncStorage.getItem("todos");
      if (data) setTodos(JSON.parse(data));
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function HomeStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeMain">
          {() => <HomeScreen todos={todos} setTodos={setTodos} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  function StatsScreen() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StatsMain">
          {() => <StatisticsScreen todos={todos} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName =
              route.name === "Home" ? "home-outline" : "bar-chart-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2e86de",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Stats" component={StatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
