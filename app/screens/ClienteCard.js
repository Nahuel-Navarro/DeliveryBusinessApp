import { StyleSheet, Text, View } from 'react-native';
import {deudasByCli} from '../helpers/deudasByCli';


export const ClienteCard = ({id,nombre,direccion,deudas}) => {

  const deuda = deudasByCli(deudas);
  let suma = 0;
  deuda.map((deu)=>{
    suma += deu.monto;
  })
  return (

      <View>
        <View style={styles.view}>
            <Text style={styles.textbig}>{id}</Text>
            <Text style={styles.textbig}> · </Text>
            <Text style={styles.textbig}>{nombre}</Text>
        </View>

        <Text style={styles.textmid}>{direccion}</Text>
        
        <View style={styles.view}>
            <Text style={styles.textsmall}>comprobantes: {deuda.length}</Text>
            <Text style={styles.textsmall}> · </Text>
            <Text style={styles.textsmall}>deuda: ${suma}</Text>
        </View>
      </View>
        
  )
}
export default ClienteCard;

const styles = StyleSheet.create({
  textbig: {fontFamily:'OpenSans-Bold',fontSize:20,color:'#000'},
  textmid: {fontFamily:'OpenSans-SemiBold',fontSize:16,color:'#000'},
  textsmall: {fontFamily:'OpenSans-Regular',fontSize:12,color:'#000'},
  view: {flexDirection:'row',paddingTop:10}
});