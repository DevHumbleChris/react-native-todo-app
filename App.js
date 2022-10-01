import { useEffect, useState } from "react";
import {
  Button,
  Provider as PaperProvider,
  TextInput,
} from "react-native-paper";
import { ScrollView, TouchableOpacity, View, Text, Image } from "react-native";
import TodoItem from "./components/TodoItem";
import { db } from "./firebase-config";
import { ref, update, push, remove, onValue } from "firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [todos, setTodos] = useState({});
  const [todoItem, setTodoItem] = useState("");
  const [isClearingTodos, setIsClearingTodos] = useState(false)
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
  const clearAllTodos = () => {
    setIsClearingTodos(true)
    setTimeout(() => {
      remove(ref(db, '/todos'))
      setIsClearingTodos(false)
      setTodos({})
    }, 2000)
  }
  const checkTodo = (id, itemTodo, checkedVal) => {
    update(ref(db, '/todos'), {
      title: itemTodo,
      done: checkedVal
    })
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
                <TodoItem key={key} todoItem={todos[key]} id={key} updateCheckTodo={checkTodo} />
              )
            })}
          </>
        ): (
          <View style={{
            alignItems: 'center',
            marginTop: 60
          }}>
            <Image
              style={{
                height: 300, width: 300, resizeMode: 'contain'
              }}
              source={{
                uri: 'https://ouch-cdn2.icons8.com/V99qjW06gZwdobHIG9o4HpbeKxLMXABe1NdtM09vM8o/rs:fit:256:252/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTAw/MC9lYmQwNjRjZC04/OWEyLTRhOGQtYTQz/Yy1iMzI4OWRhODY2/Yjkuc3Zn.png'
              }}
            />
            <Text style={{
              fontSize: 35,
              marginTop: 10
            }}>No Todos</Text>
          </View>
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
          onPress={clearAllTodos}
          loading={isClearingTodos}
        >
          Clear all todos
        </Button>
      </View>
     </SafeAreaView>
    </PaperProvider>
  );
}
