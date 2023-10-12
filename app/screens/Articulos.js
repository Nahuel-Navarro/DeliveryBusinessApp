import { View, Text } from "react-native"
import {openDatabase} from '../data/db';
import {productosLimpieza} from '../data/product';
import { useEffect } from "react";

const db = openDatabase();

function leerArticulosBD(){
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM Articulos',
      [],
      (_, {rows}) => {
        const productosLimpieza = rows._array
        console.log('Los Articulos cargados son: ', productosLimpieza)
      },
      (_, error) => {
        console.error("Error al querer leer", error.message);
      }
    )
  })
}
function ArticulosSQLite() {
  db.transaction((tx) => {
    productosLimpieza.forEach((productosLimpieza) => {
      tx.executeSql(
        'SELECT * FROM Articulos WHERE id = ?',
        [productosLimpieza.id],
        (_, { rows }) => {
          if (rows.length === 0) {
            tx.executeSql(
              'INSERT INTO Articulos (id, articulo, nombre, descripcion, precio, stock, url) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [
                productosLimpieza.id,
                productosLimpieza.articulo,
                productosLimpieza.nombre,
                productosLimpieza.descripcion,
                productosLimpieza.precio,
                productosLimpieza.stock,
                productosLimpieza.url
              ],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  console.log('Articulo insertado con éxito');
                } else {
                  console.log('Error en la inserción del articulos');
                }
              },
              (_, error) => {
                console.log('Error durante la inserción del articulo: ' + error.message);
              }
            );
          } else {
            console.log('Articulo ya existe en la base de datos');
          }
        },
        (_, error) => {
          console.log('Error durante la consulta: ' + error.message);
        }
      );
    });
  });
}


const Product = () => {
        useEffect(() => {
          ArticulosSQLite();
        }, []);
        useEffect(() =>{
          leerArticulosBD();
        })
    return(
        <View>
            <Text>
                
            </Text>
        </View>
    )
}
export default Product;