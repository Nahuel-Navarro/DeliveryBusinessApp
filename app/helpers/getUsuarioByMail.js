import { useEffect, useState } from 'react';
import { getDbConnection, getUsuarios } from '../data/db';
import { usuarios } from '../data/usuarios';

export const getUsuarioByMail = (usu, formData ) => {

    return usu.find( usu => usu.mail === formData.email && usu.contraseña === formData.password && usu.rol === 'Vendedor');

}