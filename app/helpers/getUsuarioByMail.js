import { openDatabase } from '../data/db';

export const getUsuarioByMail = async (formData) => {
  const db = openDatabase();

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * from Usuarios WHERE mail = ? AND contraseña = ? AND rol = ?`,
            [formData.email, formData.password, 'Vendedor'],
            (_, { rows: { _array } }) => {
                //console.log('Usuario encontrado antes del if:', _array[0]);
              if (_array.length > 0) {
                //console.log('Usuario encontrado:', _array[0]);
                resolve(_array[0]);
              } else {
                console.log('Usuario no encontrado');
                resolve(null);
              }
            },
            (_, error) => {
              console.log('Error en la consulta:', error);
              reject(error);
            }
          );
    });
  });
};