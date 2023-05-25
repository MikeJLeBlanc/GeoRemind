import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import List from '../components/List';

function TaskScreen(navigation) {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = async () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
    if (newTaskName) {
      const newTask = { name: newTaskName };
      setTask([...task, newTask]);
      setTaskItems(newTaskName);
      try {
        const storedLists = await AsyncStorage.getItem('tasks');
        const parsedLists = storedLists ? JSON.parse(storedLists) : [];
        const updatedLists = [...parsedLists, newList];
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedLists));
      } catch (error) {
        console.log(error);
      }
    }
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    AsyncStorage.removeItem(index);
  }

  React.useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTaskItems(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadTasks();
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
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            {/* This is where the tasks will stack longpress to delete list, press to enter | eventually set task location and be notified when within distance */}
            {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index}  onPress={() => navigation.navigate('TaskItems', props)} onLongPress={() => completeTask(index)}>
                    <List text={item} /> 
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
        
      </ScrollView>

      {/* Write a task */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

//Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
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

export default TaskScreen;