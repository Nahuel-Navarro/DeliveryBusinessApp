import { StatusBar, ScrollView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { deudasByCli } from '../helpers/deudasByCli';

const DataCliente = ({route}) => {

    const {cli, deudas} = route.params;
    
    const deuda = deudasByCli(deudas,cli);
    console.log(deuda)
    let suma = 0;
    deuda.map((deu)=>{
        console.log(deu)
      suma += parseInt(deu.monto, 10);
    })
    
    return (
        <ScrollView style={{flex:2,flexDirection:'column',backgroundColor:'#fff',paddingHorizontal:'4%'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            
            <View>
                {/* Datos */}
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <Text style={styles.texttitle}>{cli.id}</Text>
                    <Text style={styles.texttitle}> · </Text>
                    <Text style={styles.texttitle}>{cli.nombre}</Text>
                </View>
                <Text style={styles.texttitle2}>{cli.direccion}</Text>
                <Text style={styles.textmid}>· Mail: {cli.mail}</Text>
                <Text style={styles.textmid}>· Tel: {cli.telefono}</Text>
                <Text style={styles.textmid}>· IVA: {cli.iva}</Text>
                <Text style={styles.textmid}>· CUIT: {cli.cuit}</Text>
                <Text style={styles.textmid}>· Cond. venta: {cli.codvent}</Text>
            </View>
              
            {/* <View style={styles.viewrow}>
                //  Registrar visita 
                <TouchableOpacity style={styles.btn}>
                    <Image source={require('../assets/images/check.png')} style={styles.img}/>
                    <Text style={styles.textsmall}>Pedido</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => {alert('¿Registrar visita?', )}}>
                    <Image source={require('../assets/images/no.png')} style={styles.img}/>
                    <Text style={styles.textsmall}>No Compra</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}>
                    <Image source={require('../assets/images/pago.png')} style={styles.img}/>
                    <Text style={styles.textsmall}>Pago</Text>
                </TouchableOpacity>
            </View> */}

            <View style={styles.viewcolumn}>
                {/* Deuda */}
                <Text style={styles.texttitle2}>Cuenta Corriente</Text>
                <Text style={styles.textsmall}>${suma}</Text>
                <Text style={styles.textsmall}>Saldo total</Text>

            </View>

            <View style={styles.viewcolumn}>
                {/* Historial */}
                <Text style={styles.texttitle2}>Historial de Visitas</Text>
                <Text style={styles.textsmall}>0 Visitas</Text>
                <Text style={styles.textsmall}>0 Pedidos</Text>
                <Text style={styles.textsmall}>0 No Compras</Text>
            </View>

            <View style={styles.viewcolumn}>
                {/* Productos mas pedidos */}
                <Text style={styles.texttitle2}>Productos más pedidos</Text>
            </View>
            
        </ScrollView>
    )
}

export default DataCliente;

const styles = StyleSheet.create({
    texttitle: {fontFamily:'OpenSans-Bold',fontSize:24,color:'#000'},
    texttitle2: {fontFamily:'OpenSans-SemiBold',fontSize:18,color:'#000', paddingVertical:5},
    textmid: {fontFamily:'OpenSans-SemiBold',fontSize:16,color:'#000'},
    textsmall: {fontFamily:'OpenSans-SemiBold',fontSize:14,color:'#000', paddingVertical:5},
    img: {width:50, height:50},
    btn: {justifyContent:'space-between',alignItems:'center'},
    viewcolumn: {flexDirection:'column',justifyContent:'start',alignItems:'start',backgroundColor:'#ededed',width:'100%',borderRadius:10,padding:20,marginVertical:10},
    viewrow: {flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#ededed',width:'100%',borderRadius:10,padding:20,paddingHorizontal:40,marginVertical:10}
  });