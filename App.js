import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TaskScreen from './Screens/TaskScreen';
import TaskItems from './Screens/TaskItems';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Today's Tasks:" 
        component={TaskScreen} 
        />
        <Stack.Screen 
        name="TaskItems" 
        component={TaskItems}
        options={({ route }) => ({ title: route.params.listName })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;