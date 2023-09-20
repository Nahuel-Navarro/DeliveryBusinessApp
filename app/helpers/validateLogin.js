
import { setVendedor } from "../screens/Clientes";
import { getUsuarioByMail } from "./getUsuarioByMail";


export const validateLogin = (formData, navigation) => {
    const usu = getUsuarioByMail( formData ); 
        if (usu!=undefined) {
            navigation.navigate("Home");
            setVendedor(usu.id);
        } else {
            alert('Acceso invalido');
        }
    
}

export default validateLogin