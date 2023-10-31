import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native"
import {openDatabase} from '../data/db';
import {productosLimpieza} from '../data/product';
import { useEffect, useState } from "react";
import Modal from 'react-native-modal';

const db = openDatabase();

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
  const [articulosCard, setArticulosCard] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setSelectedProduct();
    setModalVisible(false);
  };
      useEffect(() => {
        ArticulosSQLite();
      }, []);
      useEffect(() =>{
        function selectArticulos() {  
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM productApp',
              [],
              (_, {rows}) => {
                const productosLimpieza = rows._array
                console.log('Los productApp cargados son: ', productosLimpieza)
                setArticulosCard(productosLimpieza)
              },
              (_, error) => {
                console.error("Error al querer leer", error.message);
              }
            )
          })
        }
        selectArticulos()
      },[])
  return (
    <ScrollView>
      <Modal
        isVisible={isModalVisible}
        style={style.modal}
        onBackdropPress={closeModal}
        backdropOpacity={0.7}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={1000}
        animationOutTiming={1}
      >
        <View style={style.modalArtDesc}>
          {selectedProduct && (
            <View key={selectedProduct.id} style={style.modalPart1}>
              <Text style={style.cardContentTitle}>{selectedProduct.nombre}</Text>
              <Image source={{ uri: selectedProduct.url }} style={style.imgSize} />
            </View>
          )}

          <View style={style.modalPart2}>
            {selectedProduct && (
              <View>
                <Text style={style.part2Titulo}>Información:</Text>
                <View style={style.gridContainer}>
                  <View style={style.gridItem}>
                    <Text style={style.boldText}>ID:</Text>
                    <Text style={style.descInfo}> {selectedProduct.id}</Text>
                  </View>
                  <View style={style.gridItem}>
                    <Text style={style.boldText}>Tipo:</Text>
                    <Text style={style.descInfo}>{selectedProduct.articulo}</Text>
                  </View>
                </View>
                <View style={style.gridContainer}>
                  <View style={style.gridItem}>
                    <Text style={style.boldText}>Precio:</Text>
                    <Text style={style.descInfo}> ${selectedProduct.precio}</Text>
                  </View>
                  <View style={style.gridItem}>
                    <Text style={style.boldText}>Stock:</Text> 
                    <Text style={style.descInfo}> {selectedProduct.stock}</Text>
                  </View>
                </View>
                <Text style={style.part2Titulo}>Descripción:</Text>
                <Text style={style.descInfo}>{selectedProduct.descripcion}</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
      <View style={style.containerArt}>
        <Text style={style.textTittle}>Articulos</Text>
      </View>
      <View style={style.secctionBoddy}>
        {articulosCard.map((producto) => (
          <TouchableOpacity key={producto.id} style={style.productCard} onPress={() => openModal(producto)}>
            <View >
              <Text style={style.cardContent}>{producto.id} · {producto.nombre}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create ({
  containerArt:{
    width:'100%',
    alignItems:"center",
    height:50,
    justifyContent:"flex-end",
    borderBottomWidth:2,
    borderBottomColor:'#FDB335',
    marginBottom:30
  },
  textTittle:{
    fontSize:24,
    marginBottom: 5,
    color: '#FDB335',
    fontFamily:'OpenSans-Bold'
  },
  secctionBoddy:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCard:{
    width:'90%',
    height:60,
    borderWidth:3,
    borderColor:'#FDB335',
    marginBottom:10,
    borderRadius:10,
    alignContent:"center",
    justifyContent:"center"
  },
  cardContent:{
    fontSize:15,
    paddingLeft:10,
    color:'#0e485e',
    fontFamily:'OpenSans-Regular'
  },
  modalArtDesc:{
    borderWidth:3,
    borderColor:'#FDB335',
    borderRadius:10
  },
  imgSize:{
    width:150,
    height:150
  },
  cardContentTitle:{
    fontSize:17,
    color:'#FDB335',
    marginBottom:20,
    marginTop:10,
    borderBottomWidth:2,
    borderBottomColor:'#FDB335',
    fontFamily:'OpenSans-Bold',
    textAlign:"center"
  },
  modalPart1:{
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
  },
  part2Titulo:{
    fontSize:15,
    marginBottom: 5,
    marginTop:15,
    color: '#FDB335',
    fontFamily:'OpenSans-Bold'
  },
  boldText: {
    fontFamily: 'OpenSans-Bold',
    color: '#FDB335',
  },
  descInfo:{
    color:'#FDB335',
  },
  modalPart2:{
    padding: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridItem: {
    flex: 1,
    flexDirection:"row"
  },

})
export default Product;