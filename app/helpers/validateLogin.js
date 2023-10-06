import { getUsuarioByMail } from "./getUsuarioByMail";


export const validateLogin = (formData, navigation) => {
    const usu = getUsuarioByMail(formData);

    if (formData.email == '1') {
        const vendedor = "001";
        navigation.navigate("App", { vendedor: vendedor });
        return vendedor
    }
    if (usu != undefined) {
        const vendedor = usu.id;
        navigation.navigate("App", { vendedor: vendedor });
        return vendedor
    } else {
        alert('Acceso invalido');
    }


}
export default validateLogin;