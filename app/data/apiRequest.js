export default callApi = async (endpoint, method = 'GET', data = null) => {
  try {
    
    //const urlbase = 'http://190.210.81.148:33530/';
     //const urlbase = 'http://192.168.48.250:33533/';
     const urlbase = 'http://192.168.48.223:88/';
     //const urlbase = "localhost:88/";
     
    const url = `${urlbase}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json', 
    };

    const options = {
      method,
      headers
    };

    if (data) {
      options.body = JSON.stringify(data);
      console.log(data)
    }
    console.log('+' + options.method)
    console.log(url)
    const response = await fetch('http://192.168.48.223:88/databaseClientes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
      },
      mode: 'cors',
      cache: 'default'
    })
    console.log('despues del fetch y antes del if = '+ response)
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('despues del if antes de jsonresponse')

    const jsonResponse = await response.json();
    console.log('despues del json response = '+ jsonResponse)
    return jsonResponse; // Return the entire JSON response
  } catch (error) {
    console.error('Network request failed:', error.message);
    throw error;
  }
};