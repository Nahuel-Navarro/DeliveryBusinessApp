import { useState} from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Buttons from '../components/Buttons';
import { validateLogin } from '../helpers/validateLogin';



const Login = ({navigation}) => {

    const [formData,setformData] = useState({
        email:'',
        password:''
    })
    return (
        <ScrollView style={{flex:2,flexDirection:'column',backgroundColor:'#fff'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#0e485e" />
            
                <View style={{flexDirection:'colum',justifyContent:'flex-start',alignItems:'center', backgroundColor:'#0e485e', width:'100%', flex:1, height:120}}>
                    <Image source={require('../assets/MS_bco.png')} style={{width:300, height:50}}/>
                    <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:20,color:'white', marginTop:20}}>Bienvenido!</Text>
                </View>

                <View style={{flexDirection:'column',paddingTop:20, alignItems:'center'}} >

                    <View style={styles.viewform} >
                        <Icon name="envelope-o" size={22} color="#818181" />
                        <TextInput onChangeText={(text)=>{setformData((prevState)=>({...prevState,email:text}))}} style={styles.input} placeholder="Email@gmail.com" placeholderTextColor="#818181" />
                    </View>

                    <View style={styles.viewform} >
                        <Icon name="lock" size={22} color="#818181" style={{}} />
                        <TextInput onChangeText={(text)=>{setformData((prevState)=>({...prevState,password:text}))}} style={styles.input} placeholder="***********" secureTextEntry={true} placeholderTextColor="#818181" />
                    </View>

                    <View style={{width:'95%',marginBottom:10}} >
                        <Text style={{fontSize:14,fontFamily:'OpenSans-SemiBold',color:'#818181',alignSelf:'flex-start',paddingTop:15}}>¿Olvidó su contraseña?</Text>
                    </View>

                </View>

                <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
                    <Buttons  btn_text={"Ingresar"} onPress={()=>validateLogin(formData,navigation)}/>
</View>

        </ScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    input:{
        height:'100%',
        width:'100%',
        fontFamily:'OpenSans-Medium',
        paddingLeft:20,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
    },
    viewform:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ededed',
        width:'95%',
        borderRadius:10,
        height:60,
        paddingLeft:20,
        marginTop:30
    }
})
