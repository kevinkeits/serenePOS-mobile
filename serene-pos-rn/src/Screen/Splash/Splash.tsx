// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Splash: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate a loading process
    setTimeout(() => {
      navigation.navigate('Login' as never);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Splash Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3498db', // Replace with your desired background color
    },
  });

export default Splash;
