import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddTodo = () => {
    if (input !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), category: selectedCategory, text: input }
      ]);
      setInput("");
    }
  };

  const handleDeleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const categories = ["All", "Home", "Work", "Health"];

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item)}>
      <View
        style={[
          styles.category,
          selectedCategory === item && styles.selectedCategory
        ]}
      >
        <Text
          style={[
            styles.categoryText,
            selectedCategory === item && styles.selectedCategoryText
          ]}
        >
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const filteredTodos =
    selectedCategory === "All"
      ? todos
      : todos.filter((todo) => todo.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
        <TextInput
          style={styles.input}
          placeholder="Add todo"
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={handleAddTodo}
        />
      </View>
      <View style={styles.categories}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.todolist}>
        {filteredTodos.length === 0 ? (
          <Text style={styles.noTodos}>No todos yet!</Text>
        ) : (
          <FlatList
            data={filteredTodos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  title: {
    fontSize: 32,
    fontWeight: "bold"
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    marginLeft: 20,
    borderRadius: 5
  },
  categories: {
    flexDirection: "row",
    marginBottom: 20
  },
  category: {
    backgroundColor: "lightgray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10
  },
  selectedCategory: {
    backgroundColor: "gray"
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000"
  },
  selectedCategoryText: {
    color: "#fff"
  },
  todolist: {
    flex: 1
  },
  item: {
    backgroundColor: "lightgray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  itemText: {
    fontSize: 16
  },
  noTodos: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50
  }
});

export default App;
