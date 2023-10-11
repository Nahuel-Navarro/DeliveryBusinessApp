// export default function callApi() {
//     const url = "localhost:88/databaseUsuarios"
//     useEffect(() => {
//         fetch(url)
//         .then((resp) => resp.json())
//         .then((json) => setData(json))
//         .catch((error) => console.error(error))
//         .finally(() => setLoading(false));
//     }, []);

//     <View style={styles.container}>
//     {loading ? (
//         <Text>Loading...</Text>
//     ) : (
//         data.map((post) => {
//         return (
//             <View>
//             <Text style={styles.title}>{post.title}</Text>
//             <Text>{post.body}</Text>
//             </View>
//         );
//         })
//     )}
//     </View>;

//     const styles = StyleSheet.create({
//         container: {
//         flex: 1,
//         justifyContent: "center",
//         backgroundColor: "#ecf0f1",
//         padding: 8,
//         },
//         title: {
//         fontSize: 30,
//         fontWeight: "bold",
//         },
//     });
// }

// api.js

export default callApi = async (endpoint, method = 'GET', data = null) => {
  
  try {
    const urlbase = 'http://192.168.48.223:88/';
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
    throw error;
  }
};