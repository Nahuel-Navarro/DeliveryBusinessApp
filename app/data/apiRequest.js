export default callApi = async (endpoint, method = 'GET', data = null) => {
  try {
    
    //const urlbase = 'http://190.210.81.148:33530/';
     //const urlbase = 'http://192.168.48.250:33533/';
     const urlbase = 'http://192.168.48.223:88/';
     //const urlbase = "localhost:88/";
     
    const url = `${urlbase}${endpoint}`;
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
      console.log(data)
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
      
    };
    const jsonResponse = await response.json();
    const latitud = jsonResponse.latitud;
    const longitud = jsonResponse.longitud;
    return { latitud, longitud };
  } catch (error) {
    console.error('Network request failed:', error.message);
    throw error;
  }
};