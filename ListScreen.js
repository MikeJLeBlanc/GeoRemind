import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemListScreen from './ItemListScreen';
import List from './components/List';

const ListScreen = () => {
  const navigation = useNavigation();
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState([]);

  const handleAddList = async () => {
    Keyboard.dismiss();
    if (newListName) {
      const newList = { name: newListName };
      setLists([...lists, newList]);
      setNewListName(null);

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

  // const deleteList = async (index) => {
    // const newList = [...lists];
    // newList.splice(index, 1);
    // setLists(newList);
    // try {
      // await AsyncStorage.setItem('lists', JSON.stringify(newList));
    // } catch (error) {
      // console.log(error);
    // }
  // };

  React.useEffect(() => {
    const loadLists = async () => {
      try {
        const storedLists = await AsyncStorage.getItem('lists');
        if (storedLists) {
          setLists(JSON.parse(storedLists));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadLists();
  }, []);


  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

        {/* Today's Tasks */}
        <View style={styles.listWrapper}>
          <Text style={styles.sectionTitle}>Your lists:</Text>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {
              newListName.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate('ItemListScreen', {name: item})}>
                    <List text={item} />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>

      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeListWrapper}
      >
        <TextInput style={styles.input} placeholder={'Name your list'} value={lists} onChangeText={text => setLists(text)} />
        <TouchableOpacity onPress={() => handleAddList()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  listWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeListWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'gray',
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });

export default ListScreen;