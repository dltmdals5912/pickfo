// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WhereScreen from './screens/WhereScreen';
import FoodScreen from './screens/FoodScreen';
import ActivityScreen from './screens/ActivityScreen';
import ReviewScreen from './screens/ReviewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="어디가지?" component={WhereScreen} />
        <Stack.Screen name="뭐먹지?" component={FoodScreen} />
        <Stack.Screen name="뭐하지?" component={ActivityScreen} />
        <Stack.Screen name="리뷰해주세요 히 히" component={ReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
