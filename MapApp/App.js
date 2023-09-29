import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { openDatabase, createTables, getMapInfo} from './data/db';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: -31.31320035959943,
    longitude: -64.22334981122708,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  
  const [markers, setMarkers] = useState([]); // Initialize with imported data
  const [newLatitude, setNewLatitude] = useState(''); // State for latitude input
  const [newLongitude, setNewLongitude] = useState(''); // State for longitude input
  const [markerTitle, setMarkerTitle] = useState(''); // State for marker title input

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
  
      if (status !== 'granted') {
        setErrorMsg('El acceso a la ubicación fue denegado');
        return;
      }
  
      const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      const initialRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
  
      setMapRegion(initialRegion);
  
      const db = openDatabase();
      createTables(db);
  
      try {
        const data = await getMapInfo(db);

        console.log("Marker Data:", data);

        setMarkers(data);
      } catch (error) {
        console.error('Error fetching data from the database:', error);
      }
    })();
  }, []);


  const generateRouteUrl = () => {
    if (markers.length < 2) {
      // At least two markers are required to generate a route URL
      alert('Add at least two markers to generate a route.');
      return;
    }

    const routeCoordinates = markers.map((marker) => `${marker.latitude},${marker.longitude}`);
    const routeUrl = `https://www.google.com/maps/dir/${routeCoordinates.join('/')}`;

    // Open the generated route URL in the device's web browser
    Linking.openURL(routeUrl);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            image={
              marker.isCurrentLocation
                ? require('./assets/TruckIcon.png')
                : require('./assets/DefaultMarker.png')
            }
            style={{
              width: marker.width || 5,
              height: marker.height || 5,
            }}
          />
        ))}
      </MapView>
      
      <Button title="Trazar ruta" onPress={generateRouteUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 8,
    padding: 8,
  },
});