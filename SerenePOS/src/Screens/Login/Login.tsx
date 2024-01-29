import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const Login = () => {}
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const navigation = useNavigation()

//   const handleLogin = () => {
//     if (username === 'user' && password === '123') {
//       // Navigate to Home screen on successful login
//       navigation.navigate('Home' as never);
//     } else {
//       // Display error message on failed login
//       Alert.alert('Error', 'Invalid username or password');
//     }
//   };

//   return (
//     <View style={styles.container}>
//               <Text style={styles.header}>serenePOS</Text>

//         <View style={{}}>
//       <Text style={{fontWeight: 'bold', color: 'black', fontSize: 13, marginTop:10}}>
//         Log In
//       </Text>
//       <Text style={{color:'black', fontSize:10, marginVertical:7}}>
//         Enter your ID and Password
//       </Text>
//       </View>

//       <View style={{borderBottomWidth: 1,
//         borderBottomColor: '#D2D2D2',
//             width: '25%',
//         alignSelf: 'center', marginBottom:18}}></View>
      
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         onChangeText={(text) => setUsername(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         onChangeText={(text) => setPassword(text)}
//       />
//       <TouchableOpacity onPress={handleLogin} style={styles.button}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       <View style={styles.underline}></View>
//       <View style={styles.signupContainer}>
//         <Text style={styles.signupText}>Don't have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
//           <Text style={styles.signupLink}>Sign Up</Text>
//         </TouchableOpacity>
//       </View>

//      </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     paddingHorizontal: 16, // Add padding for testing
//   },
//   header: {
//     fontSize: 35,
//     marginTop:30,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color:'#2563EB'
//   },
//   input: {
//     width: '25%',
//     height: 30,
//     borderWidth: 1,
//     marginBottom: 10,
//     borderColor: '#2563EB',
//     padding: 10,
//     borderRadius:6,
//     fontSize: 10,
//     textAlignVertical: 'center', // Center the text vertically
//     // Optional: Add the following to center the TextInput within its parent
//     alignSelf: 'center',
//     lineHeight: 30,
//   },
//   button: {
//     backgroundColor: '#2563EB',
//     width: '25%',
//     padding: 8,
//     borderRadius: 6,
//     marginTop: 7,
//     alignSelf: 'center',
//     alignItems: 'center'
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 10,
//   },
//   underline: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#D2D2D2',
//     width: '25%',
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   signupText: {
//     fontSize: 10,
//     color: 'black',
//   },
//   signupLink: {
//     fontSize: 10,
//     fontWeight: 'bold',
//     color: '#2563EB',
//   },
// });
export default Login;
