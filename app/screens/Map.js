// import MapView, { clientes } from 'react-native-maps';
// import { StyleSheet, View, Button } from 'react-native';
// import { useEffect, useState } from 'react';
// import * as Location from 'expo-location';
// import { openDatabase } from '../data/db';

// const db = openDatabase('Proyecto.db');



// export default function Map({navigation, route}) {
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [mapRegion, setMapRegion] = useState({
//     latitude: -31.31320035959943,
//     longitude: -64.22334981122708,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [clientess, setclientess] = useState([]);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();

//       if (status !== 'granted') {
//         setErrorMsg('El acceso a la ubicación fue denegado');
//         return;
//       }

//       const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
//       const initialRegion = {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       };

//       setMapRegion(initialRegion);
//       setCurrentLocation(location.coords);

//       // Fetch data from the SQLite database and set clientess
  //     const vendedor = route.params?.vendedor || "000"
  //     console.log(vendedor)
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         'SELECT * FROM Clientes WHERE vendedor = ? ',
  //         [vendedor],
  //         (_, { rows }) => {
  //           const clientes = rows._array;
  //           setclientess(clientes);
  //         },
  //         (_, error) => {
  //           console.error('Error fetching data from SQLite: ' + error.message);
  //         }
  //       );
  //     });
  //   })();
  // }, []);

//   const generateRouteUrl = () => {
//     if (clientess.length < 2) {
//       // At least two clientess are required to generate a route URL
//       alert('Add at least two clientess to generate a route.');
//       return;
//     }

//     const routeCoordinates = clientess.map((clientes) => `${clientes.latitude},${clientes.longitude}`);

//     if (currentLocation) {
//       // Include the current location as the starting point
//       const currentLocationString = `${currentLocation.latitude},${currentLocation.longitude}`;
//       routeCoordinates.unshift(currentLocationString);
//     }

//     const routeUrl = `https://www.google.com/maps/dir/${routeCoordinates.join('/')}`;

//     // Open the generated route URL in the device's web browser
//     Linking.openURL(routeUrl);
//   };

//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} region={mapRegion}>
//         {currentLocation && (
//           <clientes
//             coordinate={{
//               latitude: currentLocation.latitude,
//               longitude: currentLocation.longitude,
//             }}
//             title="Current Location"
//             image={require('../assets/TruckIcon.png')} // Replace with your custom icon
//             style={{
//               width: 40, // Adjust the width and height as needed
//               height: 40,
//             }}
//           />
//         )}
//         {clientess.map((clientes, index) => (
//           <clientes
//             key={index}
//             coordinate={{
//               //
//               latitude: cliente.latitud,
//               longitude: cliente.longitud,
//             }}
//             title={clientes.title}
//             // Use your custom icon or default icon here
//           />
//         ))}
//       </MapView>

//       <Button title="Trazar ruta" onPress={generateRouteUrl} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { openDatabase } from '../data/db';
import { Linking } from 'react-native';

const db = openDatabase('Proyecto.db');

export default function Map({ route }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: -31.31320035959943,
    longitude: -64.22334981122708,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [vendedor, setVendedor] = useState(route.params?.vendedor || '000');

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
      setCurrentLocation(location.coords);

      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Clientes WHERE vendedor = ? ',
          [vendedor],
          (_, { rows }) => {
            const clientes = rows._array;
            setMarkers(clientes);
          },
          (_, error) => {
            console.error('Error fetching data from SQLite: ' + error.message);
          }
        );
      });
    })();
  }, [vendedor]);


      // Fetch data from the SQLite database and set markers
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         'SELECT * FROM clientes',
  //         [],
  //         (_, { rows }) => {
  //           const clientes = rows._array;
  //           setMarkers(clientes);
  //         },
  //         (_, error) => {
  //           console.error('Error fetching data from SQLite: ' + error.message);
  //         }
  //       );
  //     });
  //   })();
  // }, []);

  const generateRouteUrl = () => {
    if (markers.length < 2) {
      // At least two markers are required to generate a route URL
      alert('Add at least two markers to generate a route.');
      return;
    }

    const routeCoordinates = markers.map((marker) => `${marker.latitude},${marker.longitude}`);

    if (currentLocation) {
      // Include the current location as the starting point
      const currentLocationString = `${currentLocation.latitude},${currentLocation.longitude}`;
      routeCoordinates.unshift(currentLocationString);
    }

    const routeUrl = `https://www.google.com/maps/dir/${routeCoordinates.join('/')}`;

    // Open the generated route URL in the device's web browser
    Linking.openURL(routeUrl);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Current Location"
            image={require('../assets/TruckIcon.png')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        )}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(marker.latitud),
              longitude: parseFloat(marker.longitud),
            }}
            title={marker.title}
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
});