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

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> parent of 680f6d5f (	modified:   app/data/apiRequest.js)
const url = 'localhost:88'; // Replace with your API base URL

export const callApi = async (endpoint, method = 'GET', data = null) => {
  try {
    const url = `${url}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      // Add any other headers you need here
    };

    const options = {
      method,
      headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const jsonResponse = await response.json();
    return jsonResponse; // Return the entire JSON response
  } catch (error) {
    throw error;
  }
};
<<<<<<< HEAD
>>>>>>> parent of 680f6d5f (	modified:   app/data/apiRequest.js)
=======
>>>>>>> parent of 680f6d5f (	modified:   app/data/apiRequest.js)
