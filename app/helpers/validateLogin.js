import { getUsuarioByMail } from "./getUsuarioByMail";


export const validateLogin = (usu, formData, clientes, navigation) => {
    const usuario = getUsuarioByMail(usu, formData ); 
    
        if (usuario!=undefined) {
            navigation.navigate("Home", {usuario, clientes});
            
        } else {
            alert('Acceso invalido');
        }
    
}

export default validateLogin;