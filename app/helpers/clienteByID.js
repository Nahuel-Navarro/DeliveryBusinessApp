import { openDatabase } from '../data/db';

export const clienteByID = (vendedor) => {
  const db = openDatabase();

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Clientes WHERE vendedor = ?',
        [vendedor],
        (_, { rows }) => {
          const clientes = rows._array;
          resolve(clientes);
        },
        (_, error) => {
          console.error('Error al consultar clientes por vendedor:', error);
          reject(error);
        }
      );
    });
  });
};