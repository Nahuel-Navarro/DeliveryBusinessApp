import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, Button, TextInput, Image } from 'react-native';
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
  const [markerTitle, setMarkerTitle] = useState(''); // State for marker title input

  useEffect(() => {
    // Request permission and set up location tracking
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
      setMarkers([
        {
          id: 'currentLocation',
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          title: 'Current Location',
          isCurrentLocation: true, // Add a flag to identify the current location marker
        },
      ]);

      // Watch for location updates
      const locationWatcher = await Location.watchPositionAsync(
        { enableHighAccuracy: true, distanceInterval: 10 },
        (location) => {
          const newMarker = {
            id: 'currentLocation',
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            title: 'Ubicacion Actual',
            isCurrentLocation: true,
          };
          setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setMarkers([newMarker]);
        }
      );
    })();
  }, []);

  const addMarker = () => {
    if (newLatitude && newLongitude) {
      const latitude = parseFloat(newLatitude);
      const longitude = parseFloat(newLongitude);

      // Create a new marker object with the specified title
      const newMarker = {
        id: `customMarker${markers.length}`,
        latitude,
        longitude,
        title: markerTitle, // Use the markerTitle state variable as the title
        isCurrentLocation: false, // Mark this as a custom marker
        width: 5,
        height: 5,
      };

      // Add the new marker to the markers state
      setMarkers([...markers, newMarker]);

      // Clear the input fields
      setNewLatitude('');
      setNewLongitude('');
      setMarkerTitle('');
    }
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
            title={marker.title} // Display the title of the marker
            image={
              marker.isCurrentLocation
                ? require('./assets/TruckIcon.png') // Custom image for current location
                : require('./assets/DefaultMarker.png') // Default image for other markers
            }
            style={{
              width: marker.width || 5, // Set the width for the marker
              height: marker.height || 5, // Set the height for the marker
            }}
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
      <TextInput
        style={styles.input}
        placeholder="Marker Title"
        onChangeText={(text) => setMarkerTitle(text)}
        value={markerTitle}
      />
      <Button title="Add Marker" onPress={addMarker} />
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
