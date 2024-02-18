import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import ViewSVG from '../../assets/svgs/ViewSVG';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiUrls } from '../../apiUrls/apiUrls';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

 

  const navigation = useNavigation()

//   {
//     "Email": "keits.kevin@gmail.com",
//     "Password": "12345"
// }

  async function handleLogin() {
    try {
      const url = ApiUrls.doLogin
      const credentials = {
        Email: username, // Using the entered username
        Password: password // Using the entered password
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
  
      if (response.ok) {
        // Login successful
        const data = await response.json();

        await AsyncStorage.setItem('userData', JSON.stringify(data));

        console.log('Login successful:', data);
        navigation.navigate('Home' as never);
        // You can perform further actions here after successful login
      } else {
        // Login failed
        console.error('Login failed:', response.statusText);
        Alert.alert('Error', 'Invalid username or password');
        // Handle login failure
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error during login
    }
  }

  const handleNavigateSignUp = () => {
    setUsername('');
    setPassword('');
    navigation.navigate('SignUp' as never)
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  React.useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);

  return (
    <View style={styles.container}>
              <Text style={styles.header}>serenePOS</Text>

        <View style={{}}>
      <Text style={{fontWeight: 'bold', color: 'black', fontSize: 13, marginTop:10}}>
        Log In
      </Text>
      <Text style={{color:'black', fontSize:10, marginVertical:7}}>
        Enter your ID and Password
      </Text>
      </View>

      <View style={{borderBottomWidth: 1,
        borderBottomColor: '#D2D2D2',
            width: '25%',
        alignSelf: 'center', marginBottom:18}}></View>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <View style={{
         width: '25%',
         height: 30,
         borderWidth: 1,
         marginBottom: 10,
         borderColor: '#D2D2D2',
         //padding: 5,
         borderRadius:6,
         alignSelf: 'center',
      }}>
      <TextInput
        style={styles.inputPassword}
        placeholder="Password"
        value={password}
        secureTextEntry={!showPassword}
        onChangeText={(text) => setPassword(text)}
      />
        <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.eyeIcon}>
          {showPassword ? <ViewSVG width='12' height='12' color="black" /> : <ViewSVG width='12' height='12' color="black" />}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.underline}></View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => handleNavigateSignUp()}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

     </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16, // Add padding for testing
  },
  header: {
    fontSize: 35,
    marginTop:30,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#2563EB'
  },
  input: {
    width: '25%',
    height: 30,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#D2D2D2',
    paddingVertical: 5,
    paddingHorizontal:10,
    borderRadius:6,
    fontSize: 10,
    textAlignVertical: 'center', 
    alignSelf: 'center',
  },
  inputPassword: {
    width: '100%',
    fontSize: 10,
    paddingVertical: 5,
    paddingHorizontal:10,
    //lineHeight: 30,
  },
  button: {
    backgroundColor: '#2563EB',
    width: '25%',
    padding: 8,
    borderRadius: 6,
    marginTop: 7,
    alignSelf: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#D2D2D2',
    width: '25%',
    alignSelf: 'center',
    marginTop: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    fontSize: 9,
    color: 'black',
  },
  signupLink: {
    fontSize: 9,
    textDecorationLine:'underline',
    color: '#2563EB',
  },
  passwordContainer: {
    position: 'relative',
    width: '25%',
    marginBottom: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
});
export default Login;
