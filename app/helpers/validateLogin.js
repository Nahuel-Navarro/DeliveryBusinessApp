
import { setVendedor } from "../screens/Clientes";
import { getUsuarioByMail } from "./getUsuarioByMail";


export const validateLogin = (formData, navigation) => {
    const usu = getUsuarioByMail( formData ); 
        if (usu!=undefined) {
            const vendedor = usu.id;
            navigation.navigate("Home", {usu : usu});
            
        } else {
            alert('Acceso invalido');
        }
    
}

export default validateLogin