import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Splash,Onboarding,Login,Home,Clientes,DataCliente, App, Articulos} from './screens/index'
import articulos from './screens/Articulos';

const Stack = createNativeStackNavigator();
const index = ()=>{
  return (
          
            <Stack.Navigator screenOptions={{headerShown:false}} >
              
              <Stack.Screen name="Splash" component={Splash} options={{ headerTitle: '' }}
              />
              <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerTitle: '' }}/>
              <Stack.Screen name="Login" component={Login} options={{ headerTitle: '' }}/>
              <Stack.Screen name="App" component={App} options={{ headerTitle: '' }} />
              <Stack.Screen name="Clientes" component={Clientes} />
              <Stack.Screen name="DataCliente" component={DataCliente} />
              <Stack.Screen name="Articulos" component={articulos} />
              
            </Stack.Navigator>
          
  );
}

export default index