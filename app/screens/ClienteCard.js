import { StyleSheet, Text, View } from 'react-native';


export const ClienteCard = ({id,nombre,direccion,telefono}) => {

  return (
    
      <View style={[styles.card, styles.shadowProp]}>
        <View style={styles.view}>
            <Text style={styles.textbig}>{id}</Text>
            <Text style={styles.textbig}> · </Text>
            <Text style={styles.textbig}>{nombre}</Text>
        </View>

        <Text style={styles.textmid}>{direccion}</Text>
        
        <View style={styles.view}>
            <Text style={styles.textsmall}>Contacto: </Text>
            <Text style={styles.textsmall}>{telefono}</Text>
        </View>
      </View>
        
  )
}
export default ClienteCard;

const styles = StyleSheet.create({
  textbig: {fontFamily:'OpenSans-Bold',fontSize:20,color:'#0e485e'},
  textmid: {fontFamily:'OpenSans-SemiBold',fontSize:16,color:'#0e485e'},
  textsmall: {fontFamily:'OpenSans-Regular',fontSize:12,color:'#0e485e'},
  view: {flexDirection:'row',paddingTop:10},
});