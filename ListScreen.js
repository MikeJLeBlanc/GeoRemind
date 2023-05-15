import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ListScreen = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');

  const addList = async () => {
    if (newListName) {
      const newList = { name: newListName };
      setLists([...lists, newList]);
      setNewListName('');
  
      try {
        const storedLists = await AsyncStorage.getItem('lists');
        const parsedLists = storedLists ? JSON.parse(storedLists) : [];
        const updatedLists = [...parsedLists, newList];
        await AsyncStorage.setItem('lists', JSON.stringify(updatedLists));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lists</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter list name"
        value={newListName}
        onChangeText={setNewListName}
      />
      <Button title="Add List" onPress={addList} />
      <FlatList
        data={lists}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ListScreen;