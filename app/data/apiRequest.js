// export const callApi = async (endpoint, method = 'GET', data = null) => {
//   try {
//     const urlbase = 'http://190.210.81.148:33530/';
//     const url = `${urlbase}${endpoint}`;
//     const headers = {
//       'Content-Type': 'application/json',
//       // Add any other headers you need here
//     };

//     const options = {
//       method,
//       headers,
//     };

//     if (data) {
//       options.body = JSON.stringify(data);
//     }

//     const response = await fetch(url, options);

//     if (!response.ok) {
//       throw new Error(`Network response was not ok (status ${response.status})`);
//     }

//     const jsonResponse = await response.json();
//     const latitud = jsonResponse.latitud;
//     const longitud = jsonResponse.longitud;
//     return { latitud, longitud };
//   } catch (error) {
//     console.error('Network request failed:', error.message);
//     throw error;
//   }
// };