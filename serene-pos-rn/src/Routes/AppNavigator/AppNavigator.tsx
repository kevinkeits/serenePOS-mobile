// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../../Screen/Splash/Splash';
import Login from '../../Screen/Login/Login';
import BottomTabNavigator from '../BottomTabNavigator/BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import Sidebar from '../../components/Sidebar/Sidebar';
import Home from '../../Screen/Home/Home';
import Profile from '../../Screen/Profile/Profile';
import Categories from '../../Screen/Categories/Categories';
import Inventory from '../../Screen/Inventory/Inventory';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator> */}
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}  />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}  />
      <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }}  />
      <Stack.Screen name="Inventory" component={Inventory} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
