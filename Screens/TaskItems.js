import { React, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const TaskItems = ({ navigation, route }) => {  
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  // const xCoordinate;
  // const yCoordinate;

  const addNewItem = () => {
    if (newItem) {
      setItems([...items, newItem]);
      setNewItem('');
    }    
  };

  const handleLocationPin = () => {
    const setXCoordinate = worldMap.Pin.getX();
    const setYCoordinate = WorldMap.Pin.getY();
  };

  const notificationCheck = () => {
    cp
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.listName}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={newItem}
        onChangeText={setNewItem}
      />
      <Button title="Add Item" onPress={addNewItem} />
      <FlatList
        data={items}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* <Button title='Set Location' onPress /> */}
      <Button title="Done" onPress={() => navigation.pop()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
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

export default TaskItems;