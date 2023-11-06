import { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Buttons from '../components/Buttons';
import { validateLogin } from '../helpers/validateLogin';
import { createTables, openDatabase } from '../data/db';
import { usuarios } from '../data/usuarios';
import * as SQLite from "expo-sqlite";
import Modal from 'react-native-modal';

const db = openDatabase();

const Login = ({ navigation }) => {
  const [usu, setUsu] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    phone: '',
    direccion: '',
  });

  useEffect(() => {
    createTables(db);
    db.transaction((tx) => {
      console.log('cargando usuarios');
      tx.executeSql(
        `SELECT * from Usuarios`,
        [],
        (_, { rows: { _array } }) => {
          setUsu(_array);
        }
      );
      console.log('cargando clientes');
      tx.executeSql(
        `SELECT * from Clientes`,
        [],
        (_, { rows: { _array } }) => {
          setClientes(_array);
        }
      );
    }, null, console.log('a'));

    function UsuariosDbCarga() {
      console.log('Abriendo la base de datos');
      db.transaction((tx) => {
        console.log('adentro');
        usuarios.forEach((usuario) => {
          tx.executeSql(
            'SELECT * FROM Usuarios WHERE id = ?',
            [usuario.id],
            (_, { rows }) => {
              const prueba = rows._array;
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
                //console.log('Usuario ya existe en la base de datos');
              }
            },
            (_, error) => {
              console.log('Error durante la consulta: ' + error.message);
            }
          );
        });
      });
    }

    UsuariosDbCarga();

  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const validarRegistro = () => {
    if (
      !registrationData.email ||
      !registrationData.password ||
      !registrationData.confirmPassword ||
      !registrationData.nombre ||
      !registrationData.phone ||
      !registrationData.direccion
    ) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    db.transaction((tx) => {
      tx.executeSql('SELECT MAX(id) AS maxId FROM Usuarios', [], (_, { rows }) => {
        const maxId = rows.item(0).maxId || 0;
        const newUserId = maxId + 1;
        console.log('Nuevo ID de usuario:', newUserId);

        tx.executeSql(
          'INSERT INTO Usuarios (id, mail, contraseña, rol, nombre, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            newUserId,
            registrationData.email,
            registrationData.password,
            'Vendedor',
            registrationData.nombre,
            registrationData.phone,
            registrationData.direccion,
          ],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              console.log('Registro exitoso');
            } else {
              console.log('Error en la inserción del usuario');
            }
          },
          (_, error) => {
            console.log('Error durante la inserción del usuario: ' + error.message);
          }
        );
      });
    });

    toggleModal();
  };
  function traerUsuarios() {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM Usuarios',
            [],
            (_, { rows }) => {
                const usuario = rows._array;
                console.log(usuario)
            },
            (_, error) => {
                console.error("Error al querer leer", error.message);
            }
        );
    });
  }

  useEffect(() => {
    traerUsuarios();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="#0e485e" />
      <Modal isVisible={isModalVisible} style={styles.modal} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Registrarse</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Email"
            value={registrationData.email}
            onChangeText={(text) => setRegistrationData({ ...registrationData, email: text })}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Contraseña"
            secureTextEntry
            value={registrationData.password}
            onChangeText={(text) => setRegistrationData({ ...registrationData, password: text })}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Repetir Contraseña"
            secureTextEntry
            value={registrationData.confirmPassword}
            onChangeText={(text) => setRegistrationData({ ...registrationData, confirmPassword: text })}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Nombre"
            value={registrationData.nombre}
            onChangeText={(text) => setRegistrationData({ ...registrationData, nombre: text })}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Teléfono"
            value={registrationData.phone}
            onChangeText={(text) => setRegistrationData({ ...registrationData, phone: text })}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Dirección"
            value={registrationData.direccion}
            onChangeText={(text) => setRegistrationData({ ...registrationData, direccion: text })}
          />
          <TouchableOpacity style={styles.registerButton} onPress={validarRegistro}>
            <Text style={styles.registerButtonText}>Registrarme</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.header}>
        <Image source={require('../assets/MS_bco.png')} style={styles.headerImage} />
        <Text style={styles.headerText}>Bienvenido!</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formField}>
          <Icon name="envelope-o" size={22} color="#818181" />
          <TextInput
            onChangeText={(text) => setFormData((prevState) => ({ ...prevState, email: text }))}
            style={styles.input}
            placeholder="Email@gmail.com"
            placeholderTextColor="#818181"
          />
        </View>
        <View style={styles.formField}>
          <Icon name="lock" size={22} color="#818181" />
          <TextInput
            onChangeText={(text) => setFormData((prevState) => ({ ...prevState, password: text }))}
            style={styles.input}
            placeholder="***********"
            secureTextEntry={true}
            placeholderTextColor="#818181"
          />
        </View>
        <TouchableOpacity style={styles.registerLink} onPress={toggleModal}>
          <Text style={styles.registerLinkText}>¿Quieres registrarte?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginButtonContainer}>
        <Buttons btn_text={"Ingresar"} onPress={() => validateLogin(formData, navigation)} />
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e485e',
    width: '100%',
    flex: 1,
    height: 120,
  },
  headerImage: {
    width: 300,
    height: 50,
  },
  headerText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    color: 'white',
    marginTop: 20,
  },
  formContainer: {
    flexDirection: 'column',
    paddingTop: 20,
    alignItems: 'center',
  },
  formField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
    width: '95%',
    borderRadius: 10,
    height: 60,
    paddingLeft: 20,
    marginTop: 30,
  },
  input: {
    height: '100%',
    width: '100%',
    fontFamily: 'OpenSans-Medium',
    paddingLeft: 20,
  },
  registerLink: {
    width: '95%',
    marginBottom: 10,
  },
  registerLinkText: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: '#818181',
    alignSelf: 'flex-start',
    paddingTop: 15,
  },
  loginButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  }, 
   modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width:'100%'
  },
  modalTitle: {
    fontSize: 30,
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
    color:'#0e485e',
    borderBottomWidth:2,
    borderBottomColor:'#0e485e',
    marginBottom:10
  },
  modalInput: {
    height: 40,
    borderBottomColor: '#0e485e',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  registerButton: {
    marginTop: 10,
    backgroundColor: '#0e485e',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
  },
  registerButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'OpenSans-SemiBold',
  },
});