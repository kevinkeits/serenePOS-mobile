import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          navigation.navigate('Home' as never);
        } else {
          setTimeout(() => {
            navigation.navigate('Login' as never);
          }, 2000);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
   
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image
        source={require('../../assets/img/SereneLogo.png')}
        style={{width: 150, height: 150, resizeMode: 'cover', }}
          />
        </View>
      <Text style={{fontWeight:'bold', color:'white', fontSize:35, marginTop:50}}>serenePOS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row',
      gap:10,
      backgroundColor: '#2563EB',
    },
  });

export default Splash;