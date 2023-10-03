import { useEffect, useState } from 'react';
import { StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { clienteByID } from '../helpers/clienteByID';
import ClienteCard from './ClienteCard';
import { usuarios } from '../data/usuarios';
import { App } from "./App";


const Clientes = ({navigation , route}) => {

  const usu = route.params;
  const vendedor =  "001";
  console.log(route.params)
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const cli = clienteByID(vendedor);
    setClientes(cli);}, [vendedor]);
    
    return (
      
        <ScrollView style={{flex:2,flexDirection:'column',backgroundColor:'#fff',paddingHorizontal:'4%'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#0e485e" />
            
                {clientes.map(cli => (
                  
                  <TouchableOpacity key={cli.id} style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'#ededed',width:'100%',borderRadius:10,paddingLeft:20,paddingBottom:20,marginVertical:10}} onPress={() => {navigation.navigate("DataCliente", {cli:cli})}}>
                       <ClienteCard  {...cli}/>
                  </TouchableOpacity>
                  
                ))}
            
        </ScrollView>
        
    )
}

export default Clientes;