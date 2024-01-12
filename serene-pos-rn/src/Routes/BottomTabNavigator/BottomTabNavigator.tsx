// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../Screen/Home/Home';
import Profile from '../../Screen/Profile/Profile';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
