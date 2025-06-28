import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  todos: [],
  filter: "all", // all | active | done
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    loadTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.active = todo.active === "done" ? "active" : "done";
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { loadTodos, addTodo, deleteTodo, toggleTodo, setFilter } =
  todosSlice.actions;

export default todosSlice.reducer;
