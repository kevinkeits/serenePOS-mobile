// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../Screen/Home/Home';
import Profile from '../../Screen/Profile/Profile';
import Categories from '../../Screen/Categories/Categories';
import Inventory from '../../Screen/Inventory/Inventory';
import Sidebar from '../../components/Sidebar/Sidebar';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}  />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}  />
      <Tab.Screen name="Categories" component={Categories} options={{ headerShown: false }}  />
      <Tab.Screen name="Inventory" component={Inventory} options={{ headerShown: false }}  />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
