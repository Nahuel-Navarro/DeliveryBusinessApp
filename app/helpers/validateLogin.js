import { getUsuarioByMail } from "./getUsuarioByMail";

export const validateLogin = (formData, navigation) => {
    const usu = getUsuarioByMail( formData ); 
        if (usu!=undefined) {
            navigation.navigate("Home")
        } else {
            alert('Acceso invalido');
        }
}
