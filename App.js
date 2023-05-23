import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskScreen from './TaskScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Today's Tasks:" component={TaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;