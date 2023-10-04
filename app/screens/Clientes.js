import { useEffect, useState } from 'react';
import { StatusBar, ScrollView, TouchableOpacity, View,Text } from 'react-native';
import { clienteByID } from '../helpers/clienteByID';
import ClienteCard from './ClienteCard';
import { usuarios } from '../data/usuarios';



const Clientes = ({navigation , route}) => {

  const usu = route.params;
  const vendedor = "001" ;
  console.log(usu)
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const cli = clienteByID(vendedor);
    setClientes(cli);}, [vendedor]);
    
    return (
        
        <ScrollView style={{flex:2,flexDirection:'column',paddingHorizontal:'4%'}} >

            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#0e485e" />
                <View style={{width:"100%", justifyContent:'center',alignItems:'center', height:60, borderBottomWidth:1.5, borderBottomColor:'#0e485e', marginBottom:20}}>
                  <Text style={{fontSize:27, color:'#0e485e'}}>CLIENTES</Text>
                </View>
                {clientes.map(cli => (
                    <TouchableOpacity key={cli.id} style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'#FDB335',width:'100%',borderRadius:10,paddingLeft:20,paddingBottom:20,marginVertical:10, shadowColor:"#0e485e", shadowOffset:{width: -2, height: 4},shadowOpacity: 0.2,shadowRadius:3, elevation:5}} onPress={() => {navigation.navigate("DataCliente", {cli:cli})}}>
                       <ClienteCard  {...cli}/>
                  </TouchableOpacity>

                ))}
        </ScrollView>
        
    )
}

export default Clientes;