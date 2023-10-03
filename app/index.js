import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Splash,Onboarding,Login,Home,Clientes,DataCliente, App} from './screens/index'
import { clienteByID } from './helpers/clienteByID';

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
              <Stack.Screen name="DataCliente" component={DataCliente} initialParams={{usu:clienteByID}}/>
              
            </Stack.Navigator>
          
  );
}

export default index