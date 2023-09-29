import { usuarios } from '../data/usuarios';


export const getUsuarioByMail = ( formData ) => {

    return usuarios.find( usu => usu.mail === formData.email && usu.contraseña === formData.password && usu.rol === 'Vendedor');

}