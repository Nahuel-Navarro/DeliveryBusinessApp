import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash,Onboarding,Login,Home,Clientes,DataCliente,App,Map } from './screens/index'

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
              <Stack.Screen name="Map" component={Map} />
              
            </Stack.Navigator>
          
  );
}

export default index