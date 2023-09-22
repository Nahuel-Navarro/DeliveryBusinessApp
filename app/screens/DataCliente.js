import React from 'react'
import { StatusBar, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import { clienteByID } from '../helpers/clienteByID'
import ClienteCard from './ClienteCard'





const DataCliente = ({route}) => {

    const {cli} = route.params;
  
    
    return (
        <ScrollView style={{flex:2,flexDirection:'column',backgroundColor:'#fff',paddingHorizontal:'4%'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            
            <View>
                {/* Datos */}
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <Text style={{fontFamily:'OpenSans-Bold',fontSize:24,color:Colors.black}}>{cli.id}</Text>
                    <Text style={{fontFamily:'OpenSans-Bold',fontSize:24,color:Colors.black,marginHorizontal:5}}>·</Text>
                    <Text style={{fontFamily:'OpenSans-Bold',fontSize:24,color:Colors.black}}>{cli.nombre}</Text>
                </View>
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:19,color:Colors.black}}>{cli.direccion}</Text>
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:16,color:Colors.black}}>· Mail: {cli.mail}</Text>
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:16,color:Colors.black}}>· Tel: {cli.telefono}</Text>
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:16,color:Colors.black}}>· IVA: {cli.iva}</Text>
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:16,color:Colors.black}}>· CUIT: {cli.cuit}</Text>
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:16,color:Colors.black}}>· Cond. venta: {cli.codvent}</Text>
            </View>
              
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#ededed',width:'100%',borderRadius:10,padding:20,paddingHorizontal:40,marginTop:10,marginBottom:10}}>
                {/* Registrar visita */}
                <TouchableOpacity style={{justifyContent:'space-between',alignItems:'center'}}>
                    <Image source={require('../assets/images/check.png')} style={{width:50, height:50}}/>
                    <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:14,color:Colors.black}}>Pedido</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent:'space-between',alignItems:'center'}}>
                    <Image source={require('../assets/images/no.png')} style={{width:50, height:50}}/>
                    <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:14,color:Colors.black}}>No Compra</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent:'space-between',alignItems:'center'}}>
                    <Image source={require('../assets/images/pago.png')} style={{width:50, height:50}}/>
                    <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:14,color:Colors.black}}>Pago</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'column',justifyContent:'start',alignItems:'start',backgroundColor:'#ededed',width:'100%',borderRadius:10,padding:20,marginTop:10,marginBottom:10}}>
                {/* Deuda */}
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:18,color:Colors.black, paddingVertical:5}}>Cuenta Corriente</Text>
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:14,color:Colors.black, paddingVertical:5}}>$0.00</Text>
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:14,color:Colors.black}}>Saldo total</Text>

            </View>

            <View style={{flexDirection:'column',justifyContent:'start',alignItems:'start',backgroundColor:'#ededed',width:'100%',borderRadius:10,padding:20,marginTop:10,marginBottom:10}}>
                {/* Historial */}
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:18,color:Colors.black, paddingVertical:5}}>Historial de Visitas</Text>
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:14,color:Colors.black, paddingVertical:5}}>0 Visitas</Text>
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:14,color:Colors.black, paddingVertical:5}}>0 Pedidos</Text>
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:14,color:Colors.black, paddingTop:5}}>0 No Compras</Text>
            </View>

            <View style={{flexDirection:'column',justifyContent:'start',alignItems:'start',backgroundColor:'#ededed',width:'100%',borderRadius:10,padding:20,marginTop:10,marginBottom:10}}>
                {/* Productos mas pedidos */}
                <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:18,color:Colors.black, paddingVertical:5}}>Productos más pedidos</Text>
            </View>
            
        </ScrollView>
    )
}

export default DataCliente