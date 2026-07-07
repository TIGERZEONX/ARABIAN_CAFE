import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";

import {
  getCategories,
  createCategory
} from "../services/category.service";

export default function CategoryScreen() {

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const saveCategory = async () => {

    try {

      await createCategory({
        name,
        description,
        parentCategory: parentCategory || null
      });

      setName("");
      setDescription("");
      setParentCategory("");

      loadCategories();

    } catch (e) {
      console.log(e);
    }

  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Category Management
      </Text>

      <TextInput
        placeholder="Category Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <TextInput
        placeholder="Parent Category ID (Optional)"
        value={parentCategory}
        onChangeText={setParentCategory}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveCategory}
      >
        <Text style={styles.buttonText}>
          Save Category
        </Text>
      </TouchableOpacity>

      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text>{item.description}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#fff",
    padding:16
  },

  title:{
    fontSize:24,
    fontWeight:"bold",
    marginBottom:20
  },

  input:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:10,
    padding:12,
    marginBottom:12
  },

  button:{
    backgroundColor:"#0A7CFF",
    padding:15,
    borderRadius:10,
    alignItems:"center",
    marginBottom:20
  },

  buttonText:{
    color:"#fff",
    fontWeight:"bold"
  },

  card:{
    backgroundColor:"#F7F7F7",
    padding:15,
    marginBottom:10,
    borderRadius:10
  },

  name:{
    fontWeight:"bold",
    fontSize:18
  }

});