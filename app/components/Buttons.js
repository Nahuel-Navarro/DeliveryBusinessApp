import { Text,TouchableOpacity } from 'react-native';

const Buttons = ({onPress,btn_text}) => {
    return (
        <TouchableOpacity style={{justifyContent:'center',width:'90%',backgroundColor:'#0e485e',height:50,marginBottom:30,borderRadius:10}} onPress={onPress}>

            <Text style={{fontSize:15,letterSpacing:1.5,textAlign:'center',position:'relative',fontFamily:'OpenSans-SemiBold',color:'#fff'}} >{btn_text}</Text>

        </TouchableOpacity>
    )
}

export default Buttons;

