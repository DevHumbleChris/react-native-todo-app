import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Checkbox } from 'react-native-paper'

const TodoItem = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.todo}>
        <Checkbox
          status={isChecked ? 'checked': 'unchecked'}
          onPress={() => setIsChecked(!isChecked)}
        />
        <Text style={[styles.todoText, { textDecorationLine: isChecked ? 'line-through': 'none'}]}>TodoItem Hello</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  todo: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  todoText: {
    paddingHorizontal: 5,
    fontSize: 16
  },
})

export default TodoItem