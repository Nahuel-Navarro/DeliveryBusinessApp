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
