import React from 'react'
import { StyleSheet, Text, View,StatusBar,Image } from 'react-native'
import {Colors} from '../../app/constants'


const Home = () => {

    
    return (
        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:Colors.white}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            <Image source={require('../assets/images/MSAzul.png')} style={{width:300, height:70}}  />   
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})