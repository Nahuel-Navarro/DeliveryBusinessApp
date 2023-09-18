import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View , Text, Dimensions, Button} from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
// import { Permissions } from 'expo-permissions';
import { Permissions } from 'expo';


export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: -31.31320035959943,
    longitude: -64.22334981122708,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      setErrorMsg('El acceso a la ubicación fue denegado');
      return;
    }
  
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() =>{
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='Multisoft'/>
      </MapView>
      <Button title='Get Location' onPress={userLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});