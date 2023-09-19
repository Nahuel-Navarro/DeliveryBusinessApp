import React from 'react'
import { StyleSheet, Text, View,StatusBar,Image, ScrollView } from 'react-native'
import {Colors} from '../../app/constants'


const Clientes = () => {

    
    return (
        <ScrollView style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:Colors.white}} >
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

export default Clientes