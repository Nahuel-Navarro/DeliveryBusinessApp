import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash,Onboarding,Login,Home,Clientes,DataCliente,App,Map, Product, Ventas} from './screens/index'
import { View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function index () {
  return (
            <Stack.Navigator initialRouteName='Splash'>
              
              <Stack.Screen options={{headerShown: false}} name="Splash" component={Splash} />
              <Stack.Screen options={{headerShown: false}} name="Onboarding" component={Onboarding} />
              <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
              <Stack.Screen options={{headerShown: false}} name="App" component={App} />
              <Stack.Screen name="Clientes" component={Clientes} options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#0e485e' },
                headerTintColor: '#FDB335',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontFamily: 'OpenSans-Bold',
                  fontSize: 25,
                }  
              }} />
              <Stack.Screen name="Informacion" component={DataCliente} options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#0e485e' },
                headerTintColor: '#FDB335',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontFamily: 'OpenSans-Bold',
                  fontSize: 25,
                }  
              }} />
              <Stack.Screen name="Mapa" component={Map} options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#0e485e' },
                headerTintColor: '#FDB335',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontFamily: 'OpenSans-Bold',
                  fontSize: 25,
                }  
              }} />
              <Stack.Screen name="Productos" component={Product} options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#0e485e' },
                headerTintColor: '#FDB335',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontFamily: 'OpenSans-Bold',
                  fontSize: 25,
                }  
              }} />
              <Stack.Screen name="Ventas" component={Ventas} options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#0e485e' },
                headerTintColor: '#FDB335',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontFamily: 'OpenSans-Bold',
                  fontSize: 25,
                }  
              }} />
              
            </Stack.Navigator>
  );

}

export default index