import React from 'react'
import { View } from 'react-native'
import { Colors } from '../constants'

export const clienteCard = ({id,nombre,direccion,mail,telefono,iva,cuit,condvent}) => {
  return (
    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <Text style={{fontFamily:'OpenSans-Bold',fontSize:20,color:Colors.black}}>{id}</Text>
            <Text style={{fontFamily:'OpenSans-Bold',fontSize:20,color:Colors.black}}>{nombre}</Text>
        </View>
        <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:16,color:Colors.black}}>{direccion}</Text>
        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <Text style={{fontFamily:'OpenSans-Regular',fontSize:12,color:Colors.black}}>comprobantes</Text>
            <Text style={{fontFamily:'OpenSans-Regular',fontSize:12,color:Colors.black}}>deuda</Text>
        </View>
                    
    </View>
  )
}
export default clienteCard
