import { Text, View,StatusBar,ImageBackground } from 'react-native';
import Buttons from '../components/Buttons';
//import {viewprincstart} from '../constants/styles';
import {getUsuarios} from '../data/db';
import { useEffect } from 'react';
import { openDatabase } from '../data/db';
import {usuarios} from '../data/usuarios';
const db = openDatabase()

function UsuariosDbCarga() {
    console.log('Abriendo la base de datos');
    db.transaction((tx) => {
    console.log('adentro')
      usuarios.forEach((usuario) => {
        console.log('Los usuarios son :', usuario)
        tx.executeSql(
          'SELECT * FROM Usuarios WHERE id = ?',
          [usuario.id],
          (_, { rows }) => {
            const prueba = rows._array;
            console.log(prueba)
            console.log('el diablo chico')
            if (rows.length === 0) {
              tx.executeSql(
                'INSERT INTO Usuarios (id, mail, contraseña, rol, nombre, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                  usuario.id,
                  usuario.mail,
                  usuario.contraseña,
                  usuario.rol,
                  usuario.nombre,
                  usuario.telefono,
                  usuario.direccion
                ],
                (_, { rowsAffected }) => {
                  if (rowsAffected > 0) {
                    console.log('Usuario insertado con éxito');
                  } else {
                    console.log('Error en la inserción del usuario');
                  }
                },
                (_, error) => {
                  console.log('Error durante la inserción del usuario: ' + error.message);
                }
              );
            } else {
              console.log('Usuario ya existe en la base de datos');
            }
          },
          (_, error) => {
            console.log('Error durante la consulta: ' + error.message);
          }
        );
      });
    });
  }
function crearTablaEntregasTotales(){ 
    db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS entregasTotales (id INTEGER PRIMARY KEY, fila TEXT, cliente TEXT, fecha TEXT, pago TEXT, total REAL)',
          [],
          (tx, result) => {
            console.log('Tabla entregasTotales creada con éxito');
          },
          (error) => {
            console.error('Error al crear la tabla pedidosTotales', error);
          }
        );
    });
 }
const Onboarding = ({navigation}) => {
    useEffect(() => {
        UsuariosDbCarga();
        crearTablaEntregasTotales();
      }, []);
    return (
        <View style={{flex:1,backgroundColor:'#fff'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#0e485e" />
            
            <View style={{flex:3,flexDirection:"column",backgroundColor:'#fff'}} >
                <ImageBackground source={require('../assets/Messenger-cuate.png')}
                style={{flex:1,width:'100%',backgroundColor:'#fff',alignSelf:'center'}}  />
            </View>

            <View style={{flex:2,backgroundColor:'#fff'}} >
                
                <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start',alignItems:'center',backgroundColor:'#fff'}} >
                    <Text style={{fontFamily:'OpenSans-Bold',color:'#0e485e',fontSize:30, borderBottomWidth:1, borderBottomColor: '#999', width:'80%', textAlign:'center'}} >MultiSoft</Text>
                    <Text style={{maxWidth:'100%', fontFamily:'OpenSans-Medium',color:"#999",fontSize:14, textAlign:'center',paddingTop:10}} >Gestión de pedidos y entregas.</Text>
                </View>   

                <View style={{flex:1,flexDirection:'column',justifyContent:'flex-end',alignItems:'center'}} >
                    <Buttons btn_text={"Empezar"} on_press={()=>navigation.navigate("Login")} />
                </View>

            </View>
            
        </View>
    )
}

export default Onboarding;

