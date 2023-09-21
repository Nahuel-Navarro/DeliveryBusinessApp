import React from 'react'
import { StatusBar, ScrollView, View, Image } from 'react-native'
import { clienteByID } from '../helpers/clienteByID'
import ClienteCard from './ClienteCard'





const DataCliente = () => {

  
    
    return (
        <ScrollView style={{flex:2,flexDirection:'column',backgroundColor:'#000',paddingHorizontal:'4%'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            
            <View>
              {/* Datos */}
            </View>
              
            <View>
              {/* Registrar visita */}
            </View>

            <View>
              {/* Deuda */}
            </View>

            <View>
              {/* Historial */}
            </View>

            <View>
              {/* Productos mas pedidos */}
            </View>
            
        </ScrollView>
    )
}

export default DataCliente