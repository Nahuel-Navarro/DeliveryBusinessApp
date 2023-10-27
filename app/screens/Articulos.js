import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native"
import {openDatabase} from '../data/db';
import {productosLimpieza} from '../data/product';
import { useEffect } from "react";

const db = openDatabase();

function leerArticulosBD(){
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM productApp',
      [],
      (_, {rows}) => {
        const productosLimpieza = rows._array
        console.log('Los productApp cargados son: ', productosLimpieza)
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
        'SELECT * FROM productApp WHERE id = ?',
        [productosLimpieza.id],
        (_, { rows }) => {
          if (rows.length === 0) {
            tx.executeSql(
              'INSERT INTO productApp (id, articulo, nombre, descripcion, precio, stock, url) VALUES (?, ?, ?, ?, ?, ?, ?)',
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
                  console.log('Error en la inserción del productApp');
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
      <ScrollView>
        <View style={style.containerArt}>
            <Text>
                
            </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5705/5705135.png' }}
          style={{ width: 200, height: 200 }} // Ajusta el ancho y alto según tu preferencia
        />
      </TouchableOpacity>
    </View>
      </ScrollView>
    )
}
const style = StyleSheet.create ({

})
export default Product;