// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogin = () => {
    // Dummy authentication logic (replace with actual authentication logic)
    if (username === '123' && password === '123') {
      // Navigate to the Home screen upon successful login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' as never }],
      });
    } else {
      toggleModal();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="Login"
        buttonStyle={styles.button}
        onPress={handleLogin}
      />
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Invalid credentials. Please try again.</Text>
          <Button title="OK" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '##2563EB', // Replace with your desired background color
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Text color
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: '#fff', // Input background color
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#2ecc71', // Button background color
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    marginBottom: 10,
  },
});

export default LoginScreen;
