import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const YourComponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint URL
    axios.get('http://192.168.48.223:88/databaseClientes')
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text>ID: {data.id}</Text>
          <Text>Nombre: {data.nombre}</Text>
          <Text>Dirección: {data.direccion}</Text>
          <Text>Latitud: {data.latitud}</Text>
          <Text>Longitud: {data.longitud}</Text>
          <Text>Mail: {data.mail}</Text>
          <Text>Teléfono: {data.telefono}</Text>
          <Text>IVA: {data.iva}</Text>
          <Text>CUIT: {data.cuit}</Text>
          <Text>Condición de Venta: {data.condvent}</Text>
          <Text>Vendedor: {data.vendedor}</Text>
        </View>
      )}
    </View>
  );
};

export default YourComponent;
