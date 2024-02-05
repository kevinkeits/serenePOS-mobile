import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import TrashSVG from '../../assets/svgs/TrashSVG';
import ViewSVG from '../../assets/svgs/ViewSVG';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const navigation = useNavigation()

  const handleNavigateLogin = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('')
    navigation.navigate('Login' as never)
  }

  const handleLogin = () => {
    if (username === 'user' && password === '123') {
      // Navigate to Home screen on successful login
      navigation.navigate('Home' as never);
    } else {
      // Display error message on failed login
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <View style={styles.container}>
        <View style={{width:'50%'}}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Text style={styles.header}>serenePOS</Text>
              <View style={{borderBottomWidth: 0.5,
        borderBottomColor: 'white',
            width: '80%',
        alignSelf: 'center', marginBottom:5}}></View>
        <Text style={{fontSize:10, color:'white'}}>"Optimalkan Bisnis Anda dengan serenePOS"</Text>
            </View>
        </View>
<View style={{backgroundColor:'white', width:'45%',   paddingBottom:10, borderRadius:7}}>
        <View style={{paddingLeft:30,}}>
      <Text style={{fontWeight: 'bold', color: 'black', fontSize: 12, marginTop:6}}>
      Get Account Now
      </Text>
      <Text style={{color:'black', fontSize:8, marginBottom:4}}>
      Enter your credentials to access your account
      </Text>
      </View>

      <View style={{borderBottomWidth: 1,
        borderBottomColor: '#D2D2D2',
        borderStyle:'dotted',
            width: '80%',
        alignSelf: 'center', marginBottom:10}}></View>
     <View>
        <Text style={{fontSize:10, color:'black', marginLeft:30, marginBottom:5}}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      </View>

      <View>
        <Text style={{fontSize:10, color:'black', marginLeft:30, marginBottom:5}}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      </View>

      <View>
        <Text style={{fontSize:10, color:'black', marginLeft:30, marginBottom:5}}>Store Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      </View>


<View>       
   <Text style={{fontSize:10, color:'black', marginLeft:30, marginBottom:5}}>Password</Text>
      <View style={{
        width:'80%',
         height: 20,
         borderWidth: 1,
         marginBottom: 10,
         borderColor: '#2563EB',
         //padding: 5,
         borderRadius:6,
         alignSelf: 'center',
      }}>
      <TextInput
        style={styles.inputPassword}
        placeholder="Password"
        secureTextEntry={!showPassword}
        onChangeText={(text) => setPassword(text)}
      />
        <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.eyeIcon}>
          {showPassword ? <ViewSVG width='10' height='10' color="#2563EB" /> : <ViewSVG width='10' height='10' color="#2563EB" />}
        </TouchableOpacity>
      </View>
  </View>

  <View>       
   <Text style={{fontSize:10, color:'black', marginLeft:30, marginBottom:5}}>Re-Enter Password</Text>
      <View style={{
        width:'80%',
         height: 20,
         borderWidth: 1,
         marginBottom: 10,
         borderColor: '#2563EB',
         //padding: 5,
         borderRadius:6,
         alignSelf: 'center',
      }}>
      <TextInput
        style={styles.inputPassword}
        placeholder="Confirm Password"
        secureTextEntry={!showConfirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
        <TouchableOpacity onPress={handleToggleConfirmPasswordVisibility} style={styles.eyeIcon}>
          {showPassword ? <ViewSVG width='10' height='10' color="#2563EB" /> : <ViewSVG width='10' height='10' color="#2563EB" />}
        </TouchableOpacity>
      </View>
  </View>

      
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => handleNavigateLogin()}>
          <Text style={styles.signupLink}>Login</Text>
        </TouchableOpacity>
      </View>
</View>

     </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 16, // Add padding for testing
  },
  header: {
    fontSize: 30,
    marginTop:20,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'white'
  },
  input: {
    width: '80%',
    height: 20,
    borderWidth: 1,
    marginBottom: 4,
    borderColor: '#2563EB',
    padding: 6,
    borderRadius:6,
    fontSize: 7,
    textAlignVertical: 'center', // Center the text vertically
    // Optional: Add the following to center the TextInput within its parent
    alignSelf: 'center',
    lineHeight: 30,
  },
  inputPassword: {
    width: '100%',
    fontSize: 7,
    paddingVertical: 5,
    paddingHorizontal:10,
    lineHeight: 30,
  },
  button: {
    backgroundColor: '#2563EB',
    width: '80%',
    padding: 8,
    borderRadius: 6,
    marginTop: 7,
    height:25,
    alignSelf: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 8,
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
    marginTop: 5,
    alignSelf:'center'
  },
  signupText: {
    fontSize: 10,
    color: 'black',
  },
  signupLink: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 4,
  },
});
export default SignUp;
