import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash,Onboarding,Login,Home,Clientes,DataCliente,App,Map, Gif, Prueba, articulos, Product } from './screens/index'

const Stack = createNativeStackNavigator();
const index = ()=>{
  return (
          
            <Stack.Navigator 
            screenOptions={{
              headerShown: false
            }}>
              
              
              <Stack.Screen name="Splash" component={Splash} 
              />
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="App" component={App}  />
              <Stack.Screen name="Clientes" component={Clientes} />
              <Stack.Screen name="DataCliente" component={DataCliente} />
              <Stack.Screen name="Map" component={Map} />
              <Stack.Screen name="Prueba" component={Prueba} />
              <Stack.Screen name="Producto" component={Product} />
              

            </Stack.Navigator>
          
  );

}

export default index