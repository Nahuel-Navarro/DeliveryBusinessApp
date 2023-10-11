import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

export default class Prueba extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          pokemon: [],
          url: 'http://192.168.48.223:88/databaseClientes'
        }
    }
    componentDidMount(){
        this.getPokemon();
    }
      
    getPokemon = () => {
        this.setState({loading:true})
        fetch(this.state.url)
        .then(res => res.json())
        .catch(error => {
            console.error('Error en la solicitud:', error);
          });        
    }

    render(){
        if (this.state.loading){
            return(
                <View style={styles.container}>
                    <FlatList 
                        data={this.state.pokemon}
                        renderItem={
                            ({item}) => <Text>{item.id}</Text>
                        }
                    />
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <FlatList 
                    data={this.state.pokemon}
                    renderItem={
                        ({item}) => <Text>{item.id}</Text>
                    }
                />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#FFF',
        alignItems:'center',
        justifyContent:'center'
    }
})