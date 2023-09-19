import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, Button, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: -31.31320035959943,
    longitude: -64.22334981122708,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([]); // State for markers
  const [routeCoordinates, setRouteCoordinates] = useState([]); // State for route
  const [newLatitude, setNewLatitude] = useState(''); // State for latitude input
  const [newLongitude, setNewLongitude] = useState(''); // State for longitude input

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
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };

  const addMarker = () => {
    if (newLatitude && newLongitude) {
      const latitude = parseFloat(newLatitude);
      const longitude = parseFloat(newLongitude);

      // Create a new marker object
      const newMarker = {
        latitude,
        longitude,
        title: 'Custom Marker',
      };

      // Add the new marker to the markers state
      setMarkers([...markers, newMarker]);
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

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
          />
        ))}
      </MapView>
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        onChangeText={(text) => setNewLatitude(text)}
        value={newLatitude}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        onChangeText={(text) => setNewLongitude(text)}
        value={newLongitude}
      />
      <Button title="Add Marker" onPress={addMarker} />
      <Button
        title="Get Location"
        onPress={() => {
          userLocation();
        }}
      />
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
