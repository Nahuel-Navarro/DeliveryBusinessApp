import React from 'react'
import { StatusBar, ScrollView, TouchableOpacity, View } from 'react-native'
import { clienteByID } from '../helpers/clienteByID'
import ClienteCard from './ClienteCard'



let vendedor = 0;
export const setVendedor = (valor) => {
    vendedor = valor;
}

const Clientes = ({navigation}) => {

  const cli = clienteByID(vendedor);
    
    return (
      
        <ScrollView style={{flex:2,flexDirection:'column',backgroundColor:'#fff',paddingHorizontal:'4%'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            
                {cli.map(cli => (
                  
                  <TouchableOpacity key={cli.id} style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'#ededed',width:'100%',borderRadius:10,paddingLeft:20,marginTop:10,marginBottom:10,paddingBottom:20}} onPress={navigation.navigate("DataCliente")}>
                       <ClienteCard  {...cli}/>
                  </TouchableOpacity>
                  
                ))}
            
        </ScrollView>
        
    )
}

export default Clientes