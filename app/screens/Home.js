import { View,StatusBar,Image } from 'react-native';


const Home = ({navigation , route}) => {

    const {usu} = route.params;

    setTimeout(()=>{
        navigation.navigate('Clientes', {usu})
    },3000)
    return (
        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            <Image source={require('../assets/images/MSAzul.png')} style={{width:300, height:70}}  />   
        </View>
    )
}

export default Home;