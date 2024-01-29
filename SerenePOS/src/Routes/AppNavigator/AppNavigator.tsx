import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../Screens/Home/Home';
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../../Screens/Profile/Profile';
import Sales from '../../Screens/Sales/Sales';
import Splash from '../../Screens/Splash/Splash';
import Login from '../../Screens/Login/Login';






const Stack = createStackNavigator();

const AppNavigator= () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}  />
        <Stack.Screen name="Sales" component={Sales} options={{ headerShown: false }}  />
      </Stack.Navigator>
      {/* <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}  />
      <Stack.Screen name="Sales" component={Sales} options={{ headerShown: false }}  />

      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default AppNavigator

