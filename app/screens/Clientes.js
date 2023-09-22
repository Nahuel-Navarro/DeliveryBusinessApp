import React, { useEffect, useState } from 'react'
import { StatusBar, ScrollView, TouchableOpacity, View } from 'react-native'
import { clienteByID } from '../helpers/clienteByID'
import ClienteCard from './ClienteCard'



// let vendedor = 0;
// export const setVendedor = (valor) => {
//     vendedor = valor;
// }

const Clientes = ({navigation , route}) => {

  const {usu} = route.params;
  const vendedor = usu.id;
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Lógica para obtener los clientes y actualizar el estado
    const cli = clienteByID(vendedor);
    setClientes(cli);
  }, [vendedor]);
    
    return (
      
        <ScrollView style={{flex:2,flexDirection:'column',backgroundColor:'#fff',paddingHorizontal:'4%'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            
                {clientes.map(cli => (
                  
                  <TouchableOpacity key={cli.id} style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'#ededed',width:'100%',borderRadius:10,paddingLeft:20,marginTop:10,marginBottom:10,paddingBottom:20}} onPress={() => {navigation.navigate("DataCliente", {cli:cli})}}>
                       <ClienteCard  {...cli}/>
                  </TouchableOpacity>
                  
                ))}
            
        </ScrollView>
        
    )
}

export default Clientes