import { useState } from 'react';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper'
import { ScrollView, TouchableOpacity, View } from 'react-native';
import TodoItem from './components/TodoItem';

export default function App() {
  const [todos, setTodos] = useState([])
  const [todoItem, setTodoItem] = useState('')
  return (
    <PaperProvider>
      <ScrollView>
      <TodoItem />
      </ScrollView>
      <View style={{
        padding: 20,
        margin: 5
      }}>
        <TextInput
          label="New Todo"
        />
        <Button icon='plus' mode="contained" style={{ marginTop: 10}}>Add New Todo</Button>
        <Button icon='minus' buttonColor='red' mode="contained" style={{ marginTop: 10}}>Add New Todo</Button>
      </View>
    </PaperProvider>
  );
}
