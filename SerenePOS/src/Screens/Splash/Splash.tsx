import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Splash: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login' as never);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold', color:'white', fontSize:35}}>serenePOS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2563EB', // Replace with your desired background color
    },
  });

export default Splash;