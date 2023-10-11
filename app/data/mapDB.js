import * as SQLite from "expo-sqlite";

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

    const db = SQLite.openDatabase("MapMultisoft.db");
    return db;
}

export function createTables(db) {

    db.transaction((tx) => {

        tx.executeSql(
            `
        CREATE TABLE IF NOT EXISTS MapInfo (
          id TEXT PRIMARY KEY,
          Latitude TEXT,
          Longitude TEXT,
          Descripcion TEXT
        )
      `,
            [],
            (_, result) => {
                // console.log("Tabla MapInfo creada con éxito");

                // Insertar un usuario de ejemplo después de crear la tabla Usuarios
                tx.executeSql(
                    "INSERT INTO MapInfo (id, Latitude, Longitude, Descripcion) VALUES ('Multisoft', '-31.021563283031128', '-64.06169422829703', 'Salames ashe')",
                    [],
                    (_, { rowsAffected }) => {
                        if (rowsAffected > 0) {
                            //console.log("Inserción exitosa");
                        } else {
                            //console.log("Error en la inserción");
                        }
                    },
                    (_, error) => {
                        //console.log("Error durante la inserción: " + error.message);
                    }
                );

                // Seleccionar y mostrar usuarios después de la inserción
                tx.executeSql(
                    "SELECT * FROM MapInfo",
                    [],
                    (_, { rows }) => {

                    },
                    (_, error) => {
                        //console.log("Error al seleccionar MapInfo: " + error.message);
                    }
                );

            },
            (_, error) => {
                //console.log("Error al crear tabla MapInfo: " + error.message);
            }
        );
    });
}

export function getMapInfo(db) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM MapInfo`,
                [],
                (_, { rows: { _array } }) => {
                    const mapInfoArray = _array || [];
                    // Format the data to match the marker object structure
                    const markers = mapInfoArray.map((MapInfo) => {
                        const latitude = parseFloat(MapInfo.Latitude);
                        const longitude = parseFloat(MapInfo.Longitude);
                        return {
                            id: MapInfo.id,
                            latitude,
                            longitude,
                            title: MapInfo.Descripcion,
                            isCurrentLocation: false,
                            width: 5,
                            height: 5,
                        };
                    });
                    resolve(markers);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
}