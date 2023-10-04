import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import { clientes } from '../data/clientes';
import { getUsuarioByMail } from "../helpers/getUsuarioByMail";
import {validateLogin} from '../helpers/validateLogin';


const App=({navigation, route})=>{
  const [expandedEntregas, setExpandedEntregas] = useState([]);
  const [expandedCobros, setExpandedCobros] = useState([]);

  const [entregasCliBorar, setEntregasCliBorrar] = useState([]);
  const [cobrosCliBorrar, setCobrosCliBorrar] = useState([]);
  //EXPANDIR O NO EL MODAL DEL MENU
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //EXPANDIR O NO LAS TARJETAS CON LA INFORMACION DEL PEDIDO  
  const toggleCardEntregas = (index) => {
    const updatedExpandedEntregas = [...expandedEntregas];
    updatedExpandedEntregas[index] = !updatedExpandedEntregas[index];
    setExpandedEntregas(updatedExpandedEntregas);
  };

  const toggleCardCobros = (index) => {
    const updatedExpandedCobros = [...expandedCobros];
    updatedExpandedCobros[index] = !updatedExpandedCobros[index];
    setExpandedCobros(updatedExpandedCobros);
  };

    //FILTRO

 const vendedor = route.params?.vendedor || "000";


  useEffect(() => {
    const entregas = clientes.filter((cliente) => cliente.vendedor === vendedor && cliente.condvent === 'Entregar');
    const cobros = clientes.filter((cliente) => cliente.vendedor === vendedor && cliente.condvent === 'Cobrar');

    setEntregasCliBorrar(entregas);
    setCobrosCliBorrar(cobros);
  }, [vendedor]);

//Eliminar tarjetas, lo hago separado por los indices:
  const eliminarTarjetaEntrega = (i) => {
    const updatedClientes = [...entregasCliBorar];
    updatedClientes.splice(i, 1);
    setEntregasCliBorrar(updatedClientes);
  };

  const eliminarTarjetaCobro = (i) => {
    const updatedClientes = [...cobrosCliBorrar];
    updatedClientes.splice(i, 1);
    setCobrosCliBorrar(updatedClientes);
  };

  //Este lo que va a hacer es verificar si todos estan entregados
  const todosEntregados = entregasCliBorar.length === 0;
  const todosCobrados = cobrosCliBorrar.length === 0;
  return(
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
              <TouchableOpacity on_press={()=>navigation.navigate("Clientes")} 
                style={style.optionBottom}>
                    <Image
                      source={require('../assets/cliente.png')}
                      style={style.imgOptionMenu}
                    />
                <Text style={style.optionText}>Clientes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Clientes')} 
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
              <TouchableOpacity onPress={()=>navigation.navigate("Map")} 
                style={style.optionBottom}
              >
                <Image
                  source={require('../assets/whatsapp.png')}
                  style={style.imgOptionMenu}
                />  
                <Text style={style.optionText}>Mapa</Text>
              </TouchableOpacity>
                <View style={style.ViewStyleFooter}>
                  <Text></Text>
                </View>

            </View>
        </Modal>
      </View>
      <View style={style.div1general}>
        <View style={style.TextTitle}>
          <Text style={style.div1pedidosText}>Entregas</Text>
        </View>
        <View style={style.tarjetasPedidosClientes}>
          {entregasCliBorar.map((cliente, index) => (
            <TouchableOpacity
              style={style.cardsButton}
              onPress={() => toggleCardEntregas(index)}
              key={`${cliente.id}-${index}`}
            >
              <View style={style.cardHeader}>             
                <Text style={style.cardTitle}>{cliente.nombre}</Text>
                <TouchableOpacity style={style.infoCliente}>
                <Image source={require('../assets/info.png')}/>
                
                </TouchableOpacity>
              </View>
              {expandedEntregas [index] && (
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
                  <Text style={style.contenidoInfoCliente}>
                  <Text style={style.contenidoInfoCliente}>Celular: </Text>
                    <Text
                         style={{ color: 'white', fontWeight:'normal',fontSize:15 }}
                      >
                        {cliente.telefono}
                    </Text>
                  </Text>
                  <Text style={style.contenidoInfoCliente}>Lista a entregar:</Text>
                  <View style={style.botonaccion}>
                    <TouchableOpacity
                        style={[
                          style.botonCancelar,
                          { backgroundColor: cliente.estado ? 'gray' : '#A2C579' },
                        ]}
                        onPress={() => eliminarTarjetaEntrega(index)}
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


    <View style={style.TextTitle}>
      <Text style={style.div1pedidosText} >Cobros</Text>
    </View>
        <View style={style.tarjetasPedidosClientes}>
          {cobrosCliBorrar.map((cliente, index) => (
            <TouchableOpacity
              style={style.cardsButton}
              onPress={() => toggleCardCobros(index)}
              key={`${cliente.id}-${index}`}
            >
              <View style={style.cardHeader}>             
                <Text style={style.cardTitle}>{cliente.nombre}</Text>
                <TouchableOpacity style={style.infoCliente}>
                <Image source={require('../assets/info.png')}/>
                
                </TouchableOpacity>
              </View>
              {expandedCobros[index] && (
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
                  <Text style={style.contenidoInfoCliente}>
                  <Text style={style.contenidoInfoCliente}>Celular: </Text>
                    <Text
                         style={{ color: 'white', fontWeight:'normal',fontSize:15 }}
                      >
                        {cliente.telefono}
                    </Text>
                  </Text>
                  <Text style={style.contenidoInfoCliente}>Lista a entregar:</Text>
                  <View style={style.botonaccion}>
                    <TouchableOpacity
                        style={[
                          style.botonCancelar,
                          { backgroundColor: cliente.estado ? 'gray' : '#A2C579' },
                        ]}
                        onPress={() => eliminarTarjetaCobro(index)}
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
        {todosCobrados && (
          <View style={style.viewPedidosCompletados}>
            <Image
                source={require('../assets/envio-gratis.png')}
                style={style.imgRepartoCompletado}
            />
            <Text style={style.todosCobradosMessage}>Has terminado de cobrar a los clientes!!</Text>
          </View>
         )}
      </View>
      <View style={style.botonAddContainer}>
        <TouchableOpacity style={style.botonAdd}>
          <Text style={style.botonAddText}>Agregar Pedido</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
  );
}

const style = StyleSheet.create ({
  container:{
    width: "100%",
    height:50,
    backgroundColor: "#0e485e",
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
    color:"#0e485e",
    fontSize:25,
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
    backgroundColor: '#0e485e',
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
    backgroundColor:'#0e485e',
    width:'100%',
    height:'15%',
    justifyContent:'center'
  },
  menuLogo:{
    width:'100%',
    height:50
  },
  infoCliente:{
    flex:1,
    alignItems:'flex-end',
  },
  cardHeader:{
    flex:1,
    flexDirection: 'row',
  },
  TextTitle:{
    width:"100%",
    alignItems:'center',
    marginBottom:30,
    marginTop:30
  },
  todosCobradosMessage: {
    fontSize: 18,
    color: '#A2C579',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom:30
  },
  botonAddContainer:{
    alignSelf:'center',
    marginBottom:50,
    marginTop:50,
    width:"90%",
    alignItems: 'center',
  },
   botonAdd:{
    width: "90%",
    padding: 20,
    borderWidth:4,
    borderColor: '#0e485e',
    borderRadius: 10,
    marginBottom:10
   },
   botonAddText:{
    textAlign:'center',
    color:'#0e485e',
    fontSize:18
   }
})

export default App;