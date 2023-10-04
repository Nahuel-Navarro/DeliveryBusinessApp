import { StatusBar, ScrollView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DataCliente = ({route}) => {

    const {cli} = route.params;
  
    
    return (
        <ScrollView style={{flex:2,flexDirection:'column',backgroundColor:'#fff',paddingHorizontal:'4%'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#0e485e" />
            <View style={{}}>
                <View style={{marginBottom:20}}>
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
                    <Text style={styles.textmid}>· Cond. venta: {cli.condvent}</Text>
                </View>


                <View style={styles.viewcolumn}>
                    {/* Deuda */}
                    <Text style={styles.texttitle2}>Cuenta Corriente</Text>
                    <Text style={styles.textsmall}>Deuda: $0.00</Text>
                    <Text style={styles.textsmall}>Ultima actualizacion: 10/10/2003</Text>
                    <TouchableOpacity style={{width:"100%", alignItems:'center', justifyContent:'center', marginTop:10, borderRadius:10, borderWidth:3, height:35, borderColor:"#0e485e"}}>
                        <Text style={{color:"#0e485e", fontSize:15, fontWeight: 'bold'}}>Cerra deuda</Text>
                    </TouchableOpacity>

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
                    <Text style={styles.texttitle2}>Productos a Entregar</Text>
                </View>
            </View>
            
        </ScrollView>
    )
}

export default DataCliente;

const styles = StyleSheet.create({
    texttitle: {fontFamily:'OpenSans-Bold',fontSize:24,color:'#0e485e'},
    texttitle2: {fontFamily:'OpenSans-SemiBold',fontSize:18,color:'#0e485e', paddingVertical:5},
    textmid: {fontFamily:'OpenSans-SemiBold',fontSize:16,color:'#0e485e'},
    textsmall: {fontFamily:'OpenSans-SemiBold',fontSize:14,color:'#0e485e', paddingVertical:5},
    img: {width:50, height:50},
    btn: {justifyContent:'space-between',alignItems:'center'},
    viewcolumn: {flexDirection:'column',justifyContent:'start',alignItems:'start',backgroundColor:'#FDB335',width:'100%',borderRadius:10,padding:20,marginVertical:10, shadowColor:"#0e485e", shadowOffset:{width: -2, height: 4},shadowOpacity: 0.2,shadowRadius:3, elevation:5},
    viewrow: {flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#ededed',width:'100%',borderRadius:10,padding:20,paddingHorizontal:40,marginVertical:10}
  });