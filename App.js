import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleTextChange = (text) => {
    setTodo(text);
  };

  const addTodo = () => {
    if (!todo.length) return;
    const newTodo = {
      id: Math.random() * 1000,
      todo,
    };
    setTodos((currentTodos) => [newTodo, ...currentTodos]);
    setTodo("");
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id != id));
  };

  return (
    <View style={styles.container}>
      <Modal>
        <View style={styles.Modal}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your todo here"
              value={todo}
              onChangeText={(e) => handleTextChange(e)}
            />
            <Button onPress={addTodo} title="Add a Todo" />
          </View>
        </View>
      </Modal>

      {/* using scroll view - inefficient */}
      {/* <ScrollView style={styles.scrollContainer}>
        {todos.map((todo, index) => (
          <TouchableOpacity key={index} activeOpacity={0.5}>
            <View style={styles.todo}>
              <Text> {todo.todo} </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      <FlatList
        styles={styles.scrollContainer}
        data={todos}
        keyExtractor={(todo) => todo.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={deleteTodo.bind(this, item.id)}
          >
            <View style={styles.todo}>
              <Text> {item.todo} </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  textInput: {
    padding: 5,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 5,
    // width: "100%",
    fontSize: 20,
  },
  todo: {
    padding: 8,
    borderWidth: 1,
    marginBottom: 2,
    backgroundColor: "#f3f3f3",
    borderRadius: 5,
    width: "100%",
  },
  inputContainer: {
    marginBottom: 15,
    // flex: 1,
  },
  Modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "98%",
  },
});
