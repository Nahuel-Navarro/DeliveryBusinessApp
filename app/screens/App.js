import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {openDatabase} from '../data/db';

const App=({navigation, route})=>{
  const [pagoConfirmado, setPagoConfirmado] = useState(false);

  const [setIndexToDelete, setSetIndexToDelete] = useState(null);

  const [isPagoModalVisible, setPagoModalVisible] = useState(false);
  const [seleccionarPagoOpcion, setSeleccionarPagoOpcion] = useState(null);

  const [expandedEntregas, setExpandedEntregas] = useState([]);
  const [expandedCobros, setExpandedCobros] = useState([]);

  const [entregasCliBorrar, setEntregasCliBorrar] = useState([]);
  const [cobrosCliBorrar, setCobrosCliBorrar] = useState([]);
  //EXPANDIR O NO EL MODAL DEL MENU
  const [isModalVisible, setModalVisible] = useState(false);
  const db = openDatabase();

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
    function filtrarClientes() {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Clientes WHERE vendedor = ? AND convent = ?',
          [vendedor, 'Entregar'],
          (_, { rows }) => {
            const entregas = rows._array;
            setEntregasCliBorrar(entregas);
          },
          (_, error) => {
            console.error("Error al filtrar entregas", error.message);
          }
        );
    
        tx.executeSql(
          'SELECT * FROM Clientes WHERE vendedor = ? AND convent = ?',
          [vendedor, 'Cobrar'],
          (_, { rows }) => {
            const cobros = rows._array;
            setCobrosCliBorrar(cobros);
          },
          (_, error) => {
            console.error("Error al filtrar cobros", error.message);
          }
        );
      });
    }
    
    useEffect(() => {
      filtrarClientes();
    }, [vendedor]);

//Eliminar tarjetas, lo hago separado por los indices:
  const eliminarTarjetaEntrega = (i) => {
    const updatedClientes = [...entregasCliBorrar];
    updatedClientes.splice(i, 1);
    setEntregasCliBorrar(updatedClientes);
  };

  const eliminarTarjetaCobro = (i) => {
    const updatedClientes = [...cobrosCliBorrar];
    updatedClientes.splice(i, 1);
    setCobrosCliBorrar(updatedClientes);
  };

  //Este lo que va a hacer es verificar si todos estan entregados
  const todosEntregados = entregasCliBorrar.length === 0;
  const todosCobrados = cobrosCliBorrar.length === 0;

  //Modal de pago
  const abrirModalPago = (index) => {
    setPagoModalVisible(true);
    setSeleccionarPagoOpcion(null);
    setSetIndexToDelete(index);
  };
  const manejoOpcionePago = (option) => {
    setSeleccionarPagoOpcion(option);
  };

  const confirmPayment = () => {
    if (seleccionarPagoOpcion === null) {
      console.log("Debes seleccionar una forma de pago antes de confirmar el pago.");
    } else {
      console.log("Pago confirmado:", seleccionarPagoOpcion);
      setPagoConfirmado(true);
      setPagoModalVisible(false);
      eliminarTarjetaEntrega(setIndexToDelete);
    }
  };
  const cambiarFormaDePago = () => {
    setSeleccionarPagoOpcion(null); // Resetea la forma de pago
    setPagoConfirmado(false); // Marca el pago como no confirmado
  };
  return(
      <ScrollView>
      <View style={style.container}>
      <Modal
        isVisible={isPagoModalVisible}
      >
        <View style={style.paymentOptionsContainer}>
          <Text style={style.paymentOptionsTitle}>Selecciona una forma de pago</Text>
          
          <TouchableOpacity
            style={[
              style.paymentOption,
              seleccionarPagoOpcion === 'efectivo' ? style.seleccionarPagoOpcion : null
            ]}
            onPress={() => manejoOpcionePago('efectivo')}
          >
            <Text style={style.paymentOptionText}>Efectivo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              style.paymentOption,
              seleccionarPagoOpcion === 'debito' ? style.seleccionarPagoOpcion : null
            ]}
            onPress={() => manejoOpcionePago('debito')}
          >
            <Text style={style.paymentOptionText}>Debito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              style.paymentOption,
              seleccionarPagoOpcion === 'credito' ? style.seleccionarPagoOpcion : null
            ]}
            onPress={() => manejoOpcionePago('credito')}
          >
            <Text style={style.paymentOptionText}>Credito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              style.paymentOption,
              seleccionarPagoOpcion === 'transferencia' ? style.seleccionarPagoOpcion : null
            ]}
            onPress={() => manejoOpcionePago('transferencia')}
          >
            <Text style={style.paymentOptionText}>Transferencia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.confirmPaymentButton}
            onPress={() => {
              if (pagoConfirmado) {
                cambiarFormaDePago();
              } else {
                confirmPayment();
              }
            }}
          >
  <Text style={style.confirmPaymentButtonText}>
    {pagoConfirmado ? 'Cambiar Forma de Pago' : 'Confirmar Pago'}
  </Text>
</TouchableOpacity>
        </View>

      </Modal>
        <TouchableOpacity style={style.buttonMenu} onPress={toggleModal}>
          <Image
            source={require("../assets/menu(1).png")}
            style={style.buttonMenuImg}
            
          />
        </TouchableOpacity>
        <View style={style.separadorLogoView}>
        <Image
          source={require("../assets/MS_bco.png")}
          style={style.Logo}
          
        /> 
        </View>
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
              <TouchableOpacity onPress={()=>navigation.navigate("Clientes")} 
                style={style.optionBottom}>
                    <Image
                      source={require('../assets/cliente.png')}
                      style={style.imgOptionMenu}
                    />
                <Text style={style.optionText}>Clientes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Prueba')} 
                style={style.optionBottom}>
                <Image
                  source={require('../assets/entrega-de-pedidos.png')}
                  style={style.imgOptionMenu}
                />                 
                <Text style={style.optionText}>Pedidos totales</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={style.optionBottom}
                onPress={()=> navigation.navigate('Producto')}
                >
                <Image
                  source={require('../assets/carrito-de-supermercado.png')}
                  style={style.imgOptionMenu}
                />  
                <Text style={style.optionText}>Articulos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("Map",{vendedor:vendedor})} 
                style={style.optionBottom}
              >
                <Image
                  source={require('../assets/ubicacion.png')}
                  style={style.imgOptionMenu}
                />  
                <Text style={style.optionText}>Map</Text>
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
          {entregasCliBorrar.map((cliente, index) => (
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
                  <Text style={style.contenidoInfoCliente}>Total:</Text>
                  <View style={style.botonaccion}>
                    <TouchableOpacity
                        style={[
                          style.botonCancelar,
                          { backgroundColor: cliente.estado ? 'gray' : '#A2C579' },
                        ]}
                        onPress={() => abrirModalPago(index)}
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
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    marginBottom:30,
  },
  separadorLogoView:{
    width:"100%",
    alignItems:'center',
    position:'absolute'
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
    marginBottom:10,
    fontFamily: 'OpenSans-Bold',
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
    marginBottom:10,
    shadowColor:"#0e485e", 
    shadowOffset:{width: 0, height: 18},
    shadowOpacity: 0.25,
    shadowRadius:20.00, 
    elevation:24
  },
  cardTitle: {
    fontSize: 18,
    color: '#FDB335',
    fontFamily: 'OpenSans-SemiBold'
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
    fontSize:18,
    fontFamily:'OpenSans-SemiBold'
   }, 
   optionText:{
    fontFamily:'OpenSans-Regular',
     fontSize:20,
     fontWeight:'normal'
   },
   paymentOptionsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop:10,
    width:'100%',
    height:70,
    backgroundColor: '#FDB335',
    borderRadius:10,
    
  },
  selectedPaymentOption: {
    backgroundColor: '#A2C579', 
  },
  paymentOptionText: {
    marginLeft: 10,
    fontSize: 18,
    color:'#0e485e',
    fontFamily: 'OpenSans-SemiBold'
  },
  confirmPaymentButton: {
    backgroundColor: '#A2C579',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmPaymentButtonText: {
    color: 'white',
    fontSize: 18,
  },
  paymentOptionsTitle:{
    fontSize: 23,
    width:'100%',
    height:69,
    color:'#FDB335',
    borderBottomWidth:2,
    borderBottomColor:'#0e485e',
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold',
    textAlign:'center',
    textAlignVertical:'center',
    
  },
  seleccionarPagoOpcion: {
    shadowColor: '#FDB335',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
  }
})

export default App;