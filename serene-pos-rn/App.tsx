import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/Screen/Home/Home';
import Profile from './src/Screen/Profile/Profile';
import AppNavigator from './src/Routes/AppNavigator/AppNavigator';
import Sidebar from './src/components/Sidebar/Sidebar';


export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <>
    <AppNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
