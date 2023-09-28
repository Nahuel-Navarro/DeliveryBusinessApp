import { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, StatusBar, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Buttons from '../components/Buttons';
import { validateLogin } from '../helpers/validateLogin';
import { createTables, openDatabase } from '../data/db';
import * as SQLite from "expo-sqlite";


const db = openDatabase();

const Login = ({ navigation }) => {
    const [usu, setUsu] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [formData, setformData] = useState({
        email: '',
        password: ''
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
                    console.log('usu',_array);
                }
            );
            console.log('cargando clientes');
            tx.executeSql(
                `SELECT * from Clientes`,
                [],
                (_, { rows: { _array } }) => {
                    setClientes(_array);
                    console.log('clientes',_array);
                }
            );
        },null,console.log('a'));

        
    }, []);

    return (
        <ScrollView style={{ flex: 2, flexDirection: 'column', backgroundColor: '#fff', paddingTop: 40, paddingHorizontal: '4%' }} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 30, color: '#000' }}>Bienvenido!</Text>
                <Image source={require('../assets/images/waving_hand.png')} style={{ width: 30, height: 30 }} />
            </View>

            <View style={{ flexDirection: 'column', paddingTop: 20 }} >

                <View style={styles.viewform} >
                    <Icon name="envelope-o" size={22} color="#818181" />
                    <TextInput onChangeText={(text) => { setformData((prevState) => ({ ...prevState, email: text })) }} style={styles.input} placeholder="Email" placeholderTextColor="#818181" />
                </View>

                <View style={styles.viewform} >
                    <Icon name="lock" size={22} color="#818181" />
                    <TextInput onChangeText={(text) => { setformData((prevState) => ({ ...prevState, password: text })) }} style={styles.input} placeholder="Contraseña" secureTextEntry={true} placeholderTextColor="#818181" />
                </View>

                <View style={{ width: '98%', marginBottom: 10 }} >
                    <Text style={{ fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#818181', alignSelf: 'flex-end', paddingTop: 15 }}>¿Olvidó su contraseña?</Text>
                </View>

            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <Buttons btn_text={"Ingresar"} on_press={() => validateLogin(usu, formData, clientes, navigation)} />
            </View>

        </ScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    input: {
        position: 'relative',
        height: '100%',
        width: '90%',
        fontFamily: 'OpenSans-Medium',
        paddingLeft: 20,
    },
    viewform: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
        width: '100%',
        borderRadius: 10,
        height: 60,
        paddingLeft: 20,
        marginTop: 20
    }
})
