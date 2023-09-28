
import { getUsuarioByMail } from "./getUsuarioByMail";


export const validateLogin = (usu, formData, navigation) => {
    const usuario = getUsuarioByMail(usu, formData ); 
    
        if (usuario!=undefined) {
            navigation.navigate("Home", {usuario : usuario});
            
        } else {
            alert('Acceso invalido');
        }
    
}

export default validateLogin;