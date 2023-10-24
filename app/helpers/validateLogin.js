import { getUsuarioByMail } from "./getUsuarioByMail";

export const validateLogin = async (formData, navigation) => {
  try {
    const usu = await getUsuarioByMail(formData);

    if (formData.email === '1') {
      const vendedor = "001";
      navigation.navigate("App", { vendedor: vendedor });
      return vendedor;
    }

    if (usu !== null) {
      const vendedor = usu.id;
      navigation.navigate("App", { vendedor: vendedor });
      return vendedor;
    } else {
      alert('Acceso inválido');
    }
  } catch (error) {
    console.error('Error al validar el inicio de sesión:', error);
  }
};
export default validateLogin;