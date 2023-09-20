import React from 'react'
import { StyleSheet, Text, View,StatusBar,Image, ScrollView } from 'react-native'
import {Colors} from '../../app/constants'
import { clientes } from '../data/clientes'
import { clienteByID } from '../helpers/clienteByID'
import ClienteCard from '../helpers/clienteCard'


let vendedor = 0;
export const setVendedor = (valor) => {
    vendedor = valor;
}

const Clientes = () => {

  const cli = clienteByID(vendedor);
    
    return (
      
        <ScrollView style={{flex:2,flexDirection:'column',backgroundColor:'#fff',paddingTop:40,paddingHorizontal:'4%'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            
                {cli.map(cli => (
                  <ClienteCard key={cli.id} {...cli} />
              
                ))}
            
            
            
        </ScrollView>
    )
}

export default Clientes