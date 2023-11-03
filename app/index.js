import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash,Onboarding,Login,Home,Clientes,DataCliente,App,Map, Product, Ventas} from './screens/index'
import { View, Text} from 'react-native';

const Stack = createNativeStackNavigator();
const st = 1;
const index = ()=>{
  return (
          
            <Stack.Navigator >
              
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen options={{headerShown: false}} name="App" component={App} />
              <Stack.Screen  name="Clientes" component={Clientes} />
              <Stack.Screen name="DataCliente" component={DataCliente} />
              <Stack.Screen name="Map" component={Map} />
              <Stack.Screen name="Producto" component={Product} />
              <Stack.Screen name="ventas" component={Ventas} />

            </Stack.Navigator>
          
  );

}

export default index