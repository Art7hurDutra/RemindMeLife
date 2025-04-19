import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import RemindersScreen from './screens/RemindersScreen';
import ContactsScreen from './screens/ContactsScreen';
import PhotosScreen from './screens/PhotosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Reminders" component={RemindersScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="Photos" component={PhotosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}