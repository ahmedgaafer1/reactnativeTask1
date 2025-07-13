import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Navigation from './src/navigation';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadTodos } from './src/redux/todosSlice';

export default function App() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('todos');
      if (data) {
        store.dispatch(loadTodos(JSON.parse(data)));
      }
    };
    fetchData();

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      AsyncStorage.setItem('todos', JSON.stringify(state.todos.todos));
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
