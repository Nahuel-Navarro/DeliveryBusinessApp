import { useEffect, useState } from 'react';
import { StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import ClienteCard from './ClienteCard';
import { createTables, openDatabase } from '../data/db';
import * as SQLite from "expo-sqlite";
import { clienteByID } from '../helpers/clienteByID';

const db = openDatabase();

const Clientes = ({navigation , route}) => {

  const {usuario, clientes} = route.params;
  const vendedor = usuario.id;
  const [clientes1, setClientes1] = useState([]);

  useEffect(() => {

    const clie = clienteByID(clientes, vendedor);
    setClientes1(clie);
  },[]);
    
  return (
      
        <ScrollView style={{flex:2,flexDirection:'column',backgroundColor:'#fff',paddingHorizontal:'4%'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            
                {clientes1.map(cli => (
                  
                  <TouchableOpacity key={cli.id} style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'#ededed',width:'100%',borderRadius:10,paddingLeft:20,paddingBottom:20,marginVertical:10}} onPress={() => {navigation.navigate("DataCliente", {cli:cli})}}>
                       <ClienteCard  {...cli}/>
                  </TouchableOpacity>
                  
                ))}
            
        </ScrollView>
        
  )
}

export default Clientes;