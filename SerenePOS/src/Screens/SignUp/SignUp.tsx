import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { ApiUrls } from '../../apiUrls/apiUrls';
import TrashSVG from '../../assets/svgs/TrashSVG';
import ViewSVG from '../../assets/svgs/ViewSVG';
import { ScrollView } from 'react-native-gesture-handler';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange }) => {
  return (
    <TouchableOpacity onPress={onChange} style={[styles.checkbox, checked && styles.checked]}>
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );
};


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [storeNameError, setStoreNameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const [agreeTerms, setAgreeTerms] = useState(false); // State for checkbox
  const [agreeTermsError, setAgreeTermsError] = useState<string>('');




  const navigation = useNavigation()

  const handleNavigateLogin = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('')
    navigation.navigate('Login' as never)
  }

  const handleAgreeTermsChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  const handleSignUp = async () => {
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Name validation
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    // Store name validation
    if (!storeName.trim()) {
      setStoreNameError('Store name is required');
      isValid = false;
    } else {
      setStoreNameError('');
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm Password is required');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!agreeTerms) {
      setAgreeTermsError('Please agree to Terms & Privacy');
      isValid = false;
    } else {
      setAgreeTermsError('');
    }

    if (isValid) {
      try {
        const url = ApiUrls.doRegister
        const userData = {
          Email: email,
          Name: name,
          StoreName: storeName,
          Password: password
        };

        const response = await axios.post(url, userData);

        if (response.status === 200) {
          if (response.data.status) {
            navigation.navigate('Login' as never);
            Alert.alert('Success', 'Registration successful!');
          } else {
            Alert.alert('Error', response.data.message);
          }
        } else {
          // Registration failed
          Alert.alert('Error', 'Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        Alert.alert('Error', 'Something went wrong during registration. Please try again.');
      }
    }
  };

  const onSignUp = () => {
    let isValid = true;

    if (confirmPassword !== password) {
      setConfirmPasswordError('Confirm password should be the same as Password');
      isValid = false;
    } else {
      handleSignUp()
    }
  }



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
              <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', marginBottom:10}}>
                <View style={{marginRight:5}}>
                  <Image
                  source={require('../../assets/img/SereneLogo.png')}
                  style={{width: 80, height: 80, resizeMode: 'cover', }}
                    />
                  </View>
              <Text style={styles.header}>serenePOS</Text>
              </View>
              <View style={{borderBottomWidth: 0.5,
        borderBottomColor: 'white',
            width: '80%',
        alignSelf: 'center', marginBottom:5}}></View>
        <Text style={{fontSize:10, color:'white'}}>"Optimalkan Bisnis Anda dengan serenePOS"</Text>
            </View>
        </View>
        
<View style={{backgroundColor:'white', width:'45%',   padding: 16, borderRadius:7}}>
<ScrollView>
        <View style={{paddingLeft:30,}}>
      <Text style={{fontWeight: 'bold', color: 'black', marginTop:6}}>
      Sign Up
      </Text>
      {/* <Text style={{marginBottom:4}}>
      Get your POS ready in a minute
      </Text> */}
      </View>

      <View style={{borderBottomWidth: 1,
        borderBottomColor: '#D2D2D2',
        borderStyle:'dotted',
            width: '80%',
            marginTop: 10,
        alignSelf: 'center', marginBottom:10}}></View>

     <View style={{marginBottom:16}}>
        {/* <Text style={{fontSize:9, color:'black', marginLeft:30}}>Name *</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
      </View>

      <View style={{marginBottom:16}}>
        {/* <Text style={{fontSize:9, color:'black', marginLeft:30}}>Email Address *</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      </View>

      <View style={{marginBottom:16}}>
        {/* <Text style={{fontSize:9, color:'black', marginLeft:30}}>Store Name *</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Store Name"
        value={storeName}
        onChangeText={(text) => setStoreName(text)}
      />
      {storeNameError ? <Text style={styles.error}>{storeNameError}</Text> : null}
      </View>


<View style={{marginBottom:16}}>       
   {/* <Text style={{fontSize:9, color:'black', marginLeft:30}}>Password *</Text> */}
      <View style={{
        width:'80%',
         height: 32,
         borderWidth: 1,
         
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
          {showPassword ? <ViewSVG width='10' height='10' color="black" /> : <ViewSVG width='10' height='10' color="black" />}
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
  </View>

  <View>       
   {/* <Text style={{fontSize:9, color:'black', marginLeft:30}}>Re-Enter Password *</Text> */}
      <View style={{
        width:'80%',
         height: 32,
         borderWidth: 1,
         
         borderColor: '#D2D2D2',
         //padding: 5,
         borderRadius:6,
         alignSelf: 'center',
      }}>
      <TextInput
        style={styles.inputPassword}
        placeholder="Confirm Password"
        value={confirmPassword}
        secureTextEntry={!showConfirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
        <TouchableOpacity onPress={handleToggleConfirmPasswordVisibility} style={styles.eyeIcon}>
          {showPassword ? <ViewSVG width='10' height='10' color="black" /> : <ViewSVG width='10' height='10' color="black" />}
        </TouchableOpacity>
      </View>
      {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}
  </View>

  <View style={{ marginBottom: 16, marginTop:16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop:10 }}>
        <View>
        <CustomCheckbox checked={agreeTerms} onChange={handleAgreeTermsChange} />
        </View>

        <View style={styles.signupContainer}>
        <Text style={styles.signupText}> I agree to the </Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Terms & Privacy</Text>
        </TouchableOpacity>
      </View>
        </View>
        {agreeTermsError ? <Text style={styles.error}>{agreeTermsError}</Text> : null}
      </View>

      
      <TouchableOpacity onPress={onSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => handleNavigateLogin()}>
          <Text style={styles.signupLink}>Login</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
    fontSize: 32,
    marginTop:20,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'white'
  },
  input: {
    width: '80%',
    height: 32,
    borderWidth: 1,
   
    borderColor: '#D2D2D2',
    paddingVertical: 5,
    paddingHorizontal:10,
    borderRadius:6,
    color:'black',
    alignSelf: 'center',
  },
  inputPassword: {
    width: '100%',
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
    height:32,
    alignSelf: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
    alignSelf:'center'
  },
  signupText: {
    color: 'black',
  },
  signupLink: {
    textDecorationLine:'underline',
    color: '#2563EB',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 4,
  },
  error: {
    color: 'red',
    fontSize:7,
    marginLeft:40, 
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 0.5,
    borderColor: '#D2D2D2',
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#2563EB',
  },
  checkmark: {
    fontSize:12,
    color: 'white',
  },
});
export default SignUp;
