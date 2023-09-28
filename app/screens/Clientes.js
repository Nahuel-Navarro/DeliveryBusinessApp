import { useEffect, useState } from 'react';
import { StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { clienteByID } from '../helpers/clienteByID';
import ClienteCard from './ClienteCard';
import { openDatabase } from '../data/db';

const db = openDatabase();

const Clientes = ({navigation , route}) => {

  const {usu} = route.params;
  const vendedor = usu.id;
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    createTables(db);
    db.transaction((tx) => {
            
      console.log('cargando clientes');
      tx.executeSql(
          `SELECT * from Clientes`,
          [],
          (_, { rows: { _array } }) => {
              setClientes(_array);
              console.log('clientes',_array);
          }
      );
    },null,console.log('a'));
    const cli = clienteByID(clientes, vendedor);
    setClientes(cli);}, 
    [vendedor]
  );
    
  return (
      
        <ScrollView style={{flex:2,flexDirection:'column',backgroundColor:'#fff',paddingHorizontal:'4%'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            
                {clientes.map(cli => (
                  
                  <TouchableOpacity key={cli.id} style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'#ededed',width:'100%',borderRadius:10,paddingLeft:20,paddingBottom:20,marginVertical:10}} onPress={() => {navigation.navigate("DataCliente", {cli:cli})}}>
                       <ClienteCard  {...cli}/>
                  </TouchableOpacity>
                  
                ))}
            
        </ScrollView>
        
  )
}

export default Clientes;