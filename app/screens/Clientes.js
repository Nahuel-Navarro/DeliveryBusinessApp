import { useEffect, useState } from 'react';
import { StatusBar, ScrollView, TouchableOpacity, View,Text } from 'react-native';
import { clienteByID } from '../helpers/clienteByID';
import ClienteCard from './ClienteCard';
import { usuarios } from '../data/usuarios';
import {openDatabase} from '../data/db';
import { clientes } from '../data/clientes';

const db = openDatabase();

function leerClientesBD(){
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM Clientes',
      [],
      (_, {rows}) => {
        const clientes = rows._array
        console.log('Los clientes cargados son: ', clientes)
      },
      (_, error) => {
        console.error("Error al querer leer", error.message);
      }
    )
  })
}
export function clientesSQLite() {
  db.transaction((tx) => {
    clientes.forEach((cliente) => {
      tx.executeSql(
        'SELECT * FROM Clientes WHERE id = ?',
        [cliente.id],
        (_, { rows }) => {
          if (rows.length === 0) {
            tx.executeSql(
              'INSERT INTO Clientes (nombre, direccion, latitud, longitud, mail, telefono, iva, cuit, convent, vendedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [
                cliente.nombre,
                cliente.direccion,
                cliente.latitud,
                cliente.longitud,
                cliente.mail,
                cliente.telefono,
                cliente.iva,
                cliente.cuit,
                cliente.condvent,
                cliente.vendedor,
              ],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Cliente insertado con éxito');
                } else {
                  console.log('Error en la inserción del cliente');
                }
              },
              (_, error) => {
                console.log('Error durante la inserción del cliente: ' + error.message);
              }
            );
          } else {
            console.log('Cliente ya existe en la base de datos');
          }
        },
        (_, error) => {
          console.log('Error durante la consulta: ' + error.message);
        }
      );
    });
  });
}


const Clientes = ({navigation , route}) => {

  const usu = route.params;
  const vendedor = '001' ;
  console.log(usu)
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const cli = clienteByID(vendedor);
    setClientes(cli);}, 
    [vendedor]);
    useEffect(() => {
      clientesSQLite();
    }, []);
    useEffect(() =>{
      leerClientesBD();
    })
    
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