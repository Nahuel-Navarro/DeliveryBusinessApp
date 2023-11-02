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
        // console.log("Tabla Clientes creada con éxito");
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
        // console.log("Error al crear tabla Clientes: " + error.message);
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
        // console.log("Tabla Usuarios creada con éxito");
        
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
            //console.log("Error al seleccionar usuarios: " + error.message);
          }
        );
        
      },
      (_, error) => {
        //console.log("Error al crear tabla Usuarios: " + error.message);
      }
    );

    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS Deudas (
        id INTEGER PRIMARY KEY,
        monto TEXT,
        cliente TEXT,
        fecha TEXT,
        usuario TEXT
      )
    `,
      // `
      //   DROP TABLE Deudas
      // `,
      [],
      (_, result) => {
        //console.log("Tabla Deudas creada con éxito");
        
        // Insertar un usuario de ejemplo después de crear la tabla Deudas
        // tx.executeSql(
        //   "INSERT INTO Deudas (id, monto, cliente, fecha, usuario) VALUES (null, '5000', '112', '28/09/2023', '2')",
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

        // Seleccionar y mostrar deudas después de la inserción
        tx.executeSql(
          "SELECT * FROM Deudas",
          [],
          (_, { rows }) => {
            
          },
          (_, error) => {
           // console.log("Error al seleccionar deudas: " + error.message);
          }
        );
        
      },
      (_, error) => {
        //console.log("Error al crear tabla Deudas: " + error.message);
      }
    );

    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS Pedidos (
          id INTEGER PRIMARY KEY,
          cliente TEXT,
          fecha TEXT,
          total TEXT,
          f_entrega TEXT
        )
      `,
      [],
      (_, result) => {
        //console.log("Tabla Pedidos creada con éxito");
        
        // Insertar un usuario de ejemplo después de crear la tabla Pedidos
        // tx.executeSql(
        //   "INSERT INTO Pedidos (id, cliente, fecha, total, f_entrega) VALUES (null, '8', '28/09/2023', '5000', '29/09/2023')",
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

        // Seleccionar y mostrar pedidos después de la inserción
        tx.executeSql(
          "SELECT * FROM Pedidos",
          [],
          (_, { rows }) => {
            
          },
          (_, error) => {
           // console.log("Error al seleccionar pedidos: " + error.message);
          }
        );
        
      },
      (_, error) => {
       // console.log("Error al crear tabla Pedidos: " + error.message);
      }
    );

    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS DetallePedidos (
          id INTEGER PRIMARY KEY,
          producto TEXT,
          cantidad TEXT,
          precio_un TEXT,
          subtotal TEXT,
          pedido TEXT
        )
      `,
      [],
      (_, result) => {
        //console.log("Tabla DetallePedidos creada con éxito");
        
        // Insertar un usuario de ejemplo después de crear la tabla DetallePedidos
        // tx.executeSql(
        //   "INSERT INTO DetallePedidos (id, producto, cantidad, precio_un, subtotal, pedido) VALUES (null, '1', '1', '5000', '5000', '1')",
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


        // Seleccionar y mostrar DetallePedidos después de la inserción
        tx.executeSql(
          "SELECT * FROM DetallePedidos",
          [],
          (_, { rows }) => {
            
          },
          (_, error) => {
           // console.log("Error al seleccionar detallePedidos: " + error.message);
          }
        );
        
      },
      (_, error) => {
       // console.log("Error al crear tabla DetallePedidos: " + error.message);
      }
    );

    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS productApp (
          id INTEGER PRIMARY KEY,
          articulo TEXT,
          nombre TEXT,
          descripcion TEXT,
          precio REAL,
          stock INT,
          url TEXT
        )
      `,
      [],
      (_, result) => {
        console.log("Tabla productApp creada con éxito");
        
        // Insertar un usuario de ejemplo después de crear la tabla Productos
        // tx.executeSql(
        //   "INSERT INTO Productos (id, articulo, nombre, descripcion, precio, stock) VALUES (null, '88', 'aa', 'aaa', '5000', '5')",
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
        
        // Seleccionar y mostrar Productos después de la inserción
        tx.executeSql(
          "SELECT * FROM productApp",
          [],
          (_, { rows }) => {
            
          },
          (_, error) => {
           // console.log("Error al seleccionar productos: " + error.message);
          }
        );
        
      },
      (_, error) => {
        //console.log("Error al crear tabla Productos: " + error.message);
      }
    );
    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS ventasTotales (
          id INTEGER PRIMARY KEY,
          cliente TEXT,
          fecha DATE,
          total INT,
          form_pago TEXT
        )
      `,
      [],
      (_, result) => {
        console.log("Tabla ventasTotales creada con éxito");
        
        // Insertar un usuario de ejemplo después de crear la tabla Productos
        // tx.executeSql(
        //   "INSERT INTO Productos (id, articulo, nombre, descripcion, precio, stock) VALUES (null, '88', 'aa', 'aaa', '5000', '5')",
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
        
        // Seleccionar y mostrar Productos después de la inserción
        tx.executeSql(
          "SELECT * FROM ventasTotales",
          [],
          (_, { rows }) => {
            
          },
          (_, error) => {
           // console.log("Error al seleccionar productos: " + error.message);
          }
        );
        
      },
      (_, error) => {
        //console.log("Error al crear tabla Productos: " + error.message);
      }
    );
    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS Productos (
          id INTEGER PRIMARY KEY,
          articulo TEXT,
          nombre TEXT,
          descripcion TEXT,
          precio TEXT,
          stock TEXT
        )
      `,
      [],
      (_, result) => {
        //console.log("Tabla Productos creada con éxito");
        
        // Insertar un usuario de ejemplo después de crear la tabla Productos
        // tx.executeSql(
        //   "INSERT INTO Productos (id, articulo, nombre, descripcion, precio, stock) VALUES (null, '88', 'aa', 'aaa', '5000', '5')",
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
        
        // Seleccionar y mostrar Productos después de la inserción
        tx.executeSql(
          "SELECT * FROM Productos",
          [],
          (_, { rows }) => {
            
          },
          (_, error) => {
           // console.log("Error al seleccionar productos: " + error.message);
          }
        );
        
      },
      (_, error) => {
        //console.log("Error al crear tabla Productos: " + error.message);
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
        console.log('usuarios array' + usuariosArray);
      }
      , (a) => { console.log(a) }, console.log('bien'));
  });
  return usuariosArray;
}
