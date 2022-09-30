import { useEffect, useState } from "react";
import {
  Button,
  Provider as PaperProvider,
  TextInput,
} from "react-native-paper";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import TodoItem from "./components/TodoItem";
import { db } from "./firebase-config";
import { ref, update, push, remove, onValue } from "firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [todos, setTodos] = useState({});
  const [todoItem, setTodoItem] = useState("");
  useEffect(() => {
    return onValue(ref(db, "/todos"), (querySnapShot) => {
      let data = querySnapShot.val();
      if (data) {
        let dataItems = { ...data };
        setTodos(dataItems);
      }
      console.log(data)
    });
  }, []);

  const todosKeys = Object.keys(todos)

  const addNewTodo = () => {
    push(ref(db, '/todos'), {
      done: false,
      title: todoItem
    })
    setTodoItem('')
  }
  return (
    <PaperProvider>
     <SafeAreaView style={{ flex: 1 }}>
     <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 25}}>Todos</Text>
      <ScrollView>
        {todosKeys.length > 0 ? (
          <>
            {todosKeys.map(key => {
              return (
                <TodoItem key={key} todoItem={todos[key]} id={key} />
              )
            })}
          </>
        ): (
          <Text style={{ padding: 20}}>No Todos</Text>
        )}
      </ScrollView>
      <View
        style={{
          padding: 20,
          margin: 5,
        }}
      >
        <TextInput label="New Todo" value={todoItem} onChangeText={(text) => setTodoItem(text)} />
        <Button icon="plus-box" mode="contained" style={{ marginTop: 10 }} onPress={addNewTodo} disabled={!todoItem} >
          Add New Todo
        </Button>
        <Button
          icon="trash-can"
          buttonColor="red"
          mode="contained"
          style={{ marginTop: 10 }}
        >
          Clear all todos
        </Button>
      </View>
     </SafeAreaView>
    </PaperProvider>
  );
}
