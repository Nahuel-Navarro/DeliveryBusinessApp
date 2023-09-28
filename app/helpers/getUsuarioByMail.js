
export const getUsuarioByMail = (usu, formData ) => {

    return usu.find( usu => usu.mail === formData.email && usu.contraseña === formData.password && usu.rol === 'Vendedor');

}