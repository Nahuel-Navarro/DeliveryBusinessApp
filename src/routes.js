import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Articulos } from "./screens/articulos.js";
import { App } from "./screens/App";

const Stack = createNativeStackNavigator();

export const  Navigation =() => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Articulos'>
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="Articulos" component={Articulos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
