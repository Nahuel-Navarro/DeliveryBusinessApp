import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../constants'
import { useNavigation } from 'expo-router'



export const ClienteCard = ({id,nombre,direccion}) => {

  return (

      <View>
        <View style={{flexDirection:'row',paddingTop:10}}>
            <Text style={{fontFamily:'OpenSans-Bold',fontSize:20,color:Colors.black}}>{id}</Text>
            <Text style={{fontFamily:'OpenSans-Bold',fontSize:20,color:Colors.black,marginHorizontal:5}}>·</Text>
            <Text style={{fontFamily:'OpenSans-Bold',fontSize:20,color:Colors.black}}>{nombre}</Text>
        </View>

        <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:16,color:Colors.black}}>{direccion}</Text>
        
        <View style={{flexDirection:'row',paddingTop:10}}>
            <Text style={{fontFamily:'OpenSans-Regular',fontSize:12,color:Colors.black}}>comprobantes</Text>
            <Text style={{fontFamily:'OpenSans-Regular',fontSize:12,color:Colors.black,marginHorizontal:5}}>·</Text>
            <Text style={{fontFamily:'OpenSans-Regular',fontSize:12,color:Colors.black}}>deuda</Text>
        </View>
      </View>
        

        
                    
    
  )
}
export default ClienteCard
