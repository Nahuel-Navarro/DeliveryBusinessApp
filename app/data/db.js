import * as SQLite from "expo-sqlite";
import { clientes } from "./clientes";

export function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => { },
        };
      },
    };
  }

  const db = SQLite.openDatabase("Proyecto.db");
  return db;
}

export function createTables(db) {
  db.transaction((tx) => {
    // Crear tabla Clientes
    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS Clientes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          direccion TEXT,
          latitud TEXT,
          longitud TEXT,
          mail TEXT,
          telefono TEXT,
          iva TEXT,
          cuit TEXT,
          convent TEXT,
          vendedor INTEGER
        )
      `,
      [],
      (_, result) => {
        console.log("Tabla Clientes creada con éxito");
        // clientes.forEach((cli)=>{tx.executeSql(
        //   'INSERT INTO Clientes (id, nombre, direccion, latitud, longitud, mail, telefono, iva, cuit, convent, vendedor) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        //     [
        //       cli.nombre,
        //       cli.direccion,
        //       cli.latitud,
        //       cli.longitud,
        //       cli.mail,
        //       cli.telefono,
        //       cli.iva,
        //       cli.cuit,
        //       cli.convent,
        //       cli.vendedor,],
        //     (_, { rowsAffected }) => {
        //       if (rowsAffected > 0) {
        //         console.log("Inserción exitosa");
        //       } else {
        //         console.log("Error en la inserción");
        //       }
        //     },
        //     (_, error) => {
        //       console.log("Error durante la inserción: " + error.message);
        //     }
        //   );})
      },
      (_, error) => {
        console.log("Error al crear tabla Clientes: " + error.message);
      }
    );

    // Crear tabla Usuarios
    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS Usuarios (
          id INTEGER PRIMARY KEY,
          mail TEXT,
          contraseña TEXT,
          rol TEXT,
          nombre TEXT,
          telefono TEXT,
          direccion TEXT
        )
      `,
      [],
      (_, result) => {
        console.log("Tabla Usuarios creada con éxito");
        
        // Insertar un usuario de ejemplo después de crear la tabla Usuarios
        // tx.executeSql(
        //   "INSERT INTO Usuarios (id, mail, contraseña, rol, nombre) VALUES (null, 'maca@gmail.com', 'Maca', 'Vendedor', 'Maca')",
        //   [],
        //   (_, { rowsAffected }) => {
        //     if (rowsAffected > 0) {
        //       console.log("Inserción exitosa");
        //     } else {
        //       console.log("Error en la inserción");
        //     }
        //   },
        //   (_, error) => {
        //     console.log("Error durante la inserción: " + error.message);
        //   }
        // );
        
        


        // Seleccionar y mostrar usuarios después de la inserción
        tx.executeSql(
          "SELECT * FROM Usuarios",
          [],
          (_, { rows }) => {
            
          },
          (_, error) => {
            console.log("Error al seleccionar usuarios: " + error.message);
          }
        );
        
      },
      (_, error) => {
        console.log("Error al crear tabla Usuarios: " + error.message);
      }
    );
  });
}


export function getUsuarios(db) {

  let usuariosArray = [];
  db.transaction((tx) => {
    tx.executeSql(
      `select * from Usuarios`,
      [],
      (_, { rows: { _array } }) => {
        const usuariosArray = _array || [];
        console.log(usuariosArray);
      }
      , (a) => { console.log(a) }, console.log('bien'));
  });
  return usuariosArray;
}