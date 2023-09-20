import React from 'react'
import { Text, View } from 'react-native'
import { Colors } from '../constants'



export const ClienteCard = ({id,nombre,direccion}) => {
    
  return (
    
    <View style={{flexDirection:'column',paddingTop:20}}>

        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ededed',width:'100%',borderRadius:10,height:60,paddingLeft:20,marginTop:20}}>
            <Text style={{fontFamily:'OpenSans-Bold',fontSize:20,color:Colors.black}}>{id}</Text>
            <Text style={{fontFamily:'OpenSans-Bold',fontSize:20,color:Colors.black}}>{nombre}</Text>
        </View>

        <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:16,color:Colors.black}}>{direccion}</Text>
        
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ededed',width:'100%',borderRadius:10,height:60,paddingLeft:20,marginTop:20}}>
            <Text style={{fontFamily:'OpenSans-Regular',fontSize:12,color:Colors.black}}>comprobantes</Text>
            <Text style={{fontFamily:'OpenSans-Regular',fontSize:12,color:Colors.black}}>deuda</Text>
        </View>
                    
    </View>
  )
}
export default ClienteCard
