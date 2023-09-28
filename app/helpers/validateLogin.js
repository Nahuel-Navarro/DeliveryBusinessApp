import React, { useState } from 'react';
import { getUsuarioByMail } from "./getUsuarioByMail";


export const validateLogin = (formData, navigation) => {
    const usu = getUsuarioByMail( formData ); 
        if (usu!=undefined) {
            const vendedor = usu.id;
            navigation.navigate("App", { usu: usu});
            
        } else {
            alert('Acceso invalido');
        }
    
}

export default validateLogin;