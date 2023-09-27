import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';
import { clientesData } from '../data/clientesEj';
// import { useNavigation} from 'expo-router';
// import { NavigationContainer } from '@react-navigation/native';
import Index from '..';


const App=()=>{
  //const navigation = useNavigation();
  //EXPANDIR O NO EL MODAL DEL MENU
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //EXPANDIR O NO LAS TARJETAS CON LA INFORMACION DEL PEDIDO
  const [expandedStates, setExpandedStates] = useState([false, false]);
  
  const toggleCard = (index) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };
  //FILTRO
  const [idToFilter, setIdToFilter] = useState(2);
  const [filteredClientes, setFilteredClientes] = useState([]);
  useEffect(() => {
    const filterData = clientesData.filter((cliente) => cliente.id === idToFilter);
    setFilteredClientes(filterData);
  }, [idToFilter]);
  const eliminarTarjeta = (i) => {
    const updatedClientes = [...filteredClientes];
    updatedClientes.splice(i, 1);//Lo borra
    setFilteredClientes(updatedClientes);
  };

  //Este lo que va a hacer es verificar si todos estan entregados
  const todosEntregados = filteredClientes.every((cliente) => cliente.estado);
  return(
    <SafeAreaProvider>
      <ScrollView>
      <View style={style.container}>
        <TouchableOpacity style={style.buttonMenu} onPress={toggleModal}>
          <Image
            source={require("../assets/menu(1).png")}
            style={style.buttonMenuImg}
            
          />
        </TouchableOpacity>
        <Image
          source={require("../assets/MS_bco.png")}
          style={style.Logo}
          
        /> 
        <Modal 
          isVisible={isModalVisible} 
          style={style.modal} 
          onBackdropPress={toggleModal}
          animationIn="slideInLeft" 
          animationOut="slideOutLeft" 
          animationInTiming={600} // =
          animationOutTiming={600} // =
          backdropTransitionInTiming={600} // Duracion de entrada
          backdropTransitionOutTiming={600} //Duracion de salida
        >
          <View style={style.modalMenu}>
              <View style={style.menuUpLogo}>  
                <Image
                  source={require('../assets/MS_bco.png')}
                  style={style.menuLogo}
                />
              </View>
              <TouchableOpacity onPress={() => console.log('Clientes')} 
                style={style.optionBottom}>
                    <Image
                      source={require('../assets/cliente.png')}
                      style={style.imgOptionMenu}
                    />
                <Text style={style.optionText}>Clientes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Entregas')} 
                style={style.optionBottom}>
                <Image
                  source={require('../assets/entrega-de-pedidos.png')}
                  style={style.imgOptionMenu}
                />                 
                <Text style={style.optionText}>Pedidos totales</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={style.optionBottom}
                >
                <Image
                  source={require('../assets/carrito-de-supermercado.png')}
                  style={style.imgOptionMenu}
                />  
                <Text style={style.optionText}>Articulos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Direcciones')} 
                style={style.optionBottom}
              >
                <Image
                  source={require('../assets/whatsapp.png')}
                  style={style.imgOptionMenu}
                />  
                <Text style={style.optionText}>Contacto</Text>
              </TouchableOpacity>
                <View style={style.ViewStyleFooter}>
                  <Text></Text>
                </View>

            </View>
        </Modal>
      </View>
      <View style={style.div1general}>
        <Text style={style.div1pedidosText}>Pedidos a Entregar</Text>
        <View style={style.tarjetasPedidosClientes}>
          {filteredClientes.map((cliente, index) => (
            <TouchableOpacity
              style={style.cardsButton}
              onPress={() => toggleCard(index)}
              key={`${cliente.id}-${index}`}
            >
              <Text style={style.cardTitle}>{cliente.nombre}</Text>
              <TouchableOpacity style={style.infoCliente}>
                <Image source={require('../assets/info.png')}/>
                
              </TouchableOpacity>
              {expandedStates[index] && (
                <View style={style.expandedContent}>
                  <Text style={style.contenidoInfoCliente}>Información del pedido:</Text>
                  <Text style={style.contenidoInfoCliente}>
                    Dirección:{' '}
                    <Text
                      style={{ color: 'white', textDecorationLine: 'underline', fontWeight:'normal', fontSize:15 }}
                      onPress={() => handleLinkClick('https://maps.app.goo.gl/i8nKcZv5W4BoAtFD6')}
                    >
                      {cliente.direccion}
                    </Text>
                  </Text>
                  <Text style={style.contenidoInfoCliente}>Lista a entregar:</Text>
                  <View style={style.botonaccion}>
                    <TouchableOpacity
                        style={[
                          style.botonCancelar,
                          { backgroundColor: cliente.estado ? 'gray' : '#A2C579' },
                        ]}
                        onPress={() => {
                          if (!cliente.estado) {
                            eliminarTarjeta(index);
                          }
                        }}
                        disabled={cliente.estado}
                      >
                        <Text style={style.textEntregar}>Entregar</Text>
                        <Image source={require('../assets/orden(1).png')} />
                      </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        {todosEntregados && (
          <View style={style.viewPedidosCompletados}>
            <Image
                source={require('../assets/repartidora(1).png')}
                style={style.imgRepartoCompletado}
            />
            <Text style={style.todosEntregadosMessage}>Has entregado todos los pedidos!!</Text>
          </View>
         )}
      </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const style = StyleSheet.create ({
  container:{
    width: "100%",
    height:50,
    marginTop:40,
    backgroundColor:"#187194",
    gap:70,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginBottom:30
  },
  Logo:{
    height:35,
    width:200
  },
  buttonMenuImg:{
    height: 26,
    width:26
  },
  div1pedidosText:{
    color:"#187194",
    alignContent:'center',
    justifyContent:'center',
    fontSize:25,
    width:"100%",
    paddingLeft:80, //Te lo coloca en el medio, sacar porque no es responsive.
    fontWeight: 'bold',
    marginBottom:10
  },
  modal:{
    justifyContent: 'flex-start',
    margin: 0
  },
  modalMenu: {
    flex:1,
    alignContent: 'center',
    height:"100%",
    width:"60%",
    backgroundColor: '#F0F3F4'
  },
  imgOptionMenu:{
    width:34,
    height:34,
    marginRight:5
  },
  ViewStyleFooter:{
    height:"15%",
    justifyContent:'flex-end',
    marginTop:"125%",//mala practica es para ver
    backgroundColor:"#A2C579"
  },
  optionBottom:{
    width:"100%",
    height:65,
    borderBottomWidth:1,
    borderBottomColor: "#979A9A",
    justifyContent:'flex-start',
    alignItems:'center',
    flexDirection:'row'
  },
  optionText:{
    fontSize:23,
    justifyContent:'center',
    alignItems:'center'
  },
  tarjetasPedidosClientes: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsButton: {
    width: "90%",
    padding: 20,
    backgroundColor: '#187194',
    borderRadius: 10,
    marginBottom:10
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FDB335'
  },
  expandedContent: {
    marginTop: 10,
  },
  contenidoInfoCliente:{
    color:'white',
    fontWeight: 'bold',
    fontSize:16
  },
  botonaccion:{
    flexDirection:'row',
    width:"100%"
  },
  botonAgregar:{
    justifyContent:'center',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:15,
    borderWidth:1,
    backgroundColor:'#FDB335',
    borderColor:'#FDB335',
    borderRadius:5
  },
  botonCancelar:{
    justifyContent:'center',
    flexDirection:'row',
    justifyContent:'flex-end',
    marginTop:15,
    borderWidth:1,
    backgroundColor:'#A2C579',
    borderColor:'#A2C579',
    borderRadius:5,
    marginLeft:100//MALA PRACTICA RESOLVER DESPUES

  },
  textAgregar:{
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center',
    marginRight:3,
    fontSize:20
  },
  textEntregar:{
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center',
    marginRight:3,
    fontSize:20,
  },
  viewPedidosCompletados:{
    justifyContent:'center',
    alignItems:'center'
  },
  todosEntregadosMessage: {
    fontSize: 18,
    color: '#A2C579',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  imgRepartoCompletado:{
    width:300,
    height:300
  },
  menuUpLogo:{
    backgroundColor:'#187194',
    width:'100%',
    height:'15%',
    justifyContent:'center'
  },
  menuLogo:{
    width:'100%',
    height:50
  },
  infoCliente:{
    
  }
})

export default App;