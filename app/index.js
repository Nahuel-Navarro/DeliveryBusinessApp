import React from 'react';
import {View,Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Splash,Onboarding,Login,Home,Clientes,DataCliente} from './screens/index'

const Stack = createNativeStackNavigator();
const index = ()=>{
  return (
          
            <Stack.Navigator screenOptions={{headerShown:false}} >
              
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Clientes" component={Clientes} />
              <Stack.Screen name="DataCliente" component={DataCliente} />
              
            </Stack.Navigator>
          
  );
}

export default index