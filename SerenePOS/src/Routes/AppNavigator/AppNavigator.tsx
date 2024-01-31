import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../Screens/Home/Home';
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../../Screens/Profile/Profile';
import Sales from '../../Screens/Sales/Sales';
import Splash from '../../Screens/Splash/Splash';
import Login from '../../Screens/Login/Login';
import Products from '../../Screens/Products/Products';
import ProductDetail from '../../Screens/ProductDetail/ProductDetail';
import DetailProduct from '../../Screens/ProductDetail/DetailProduct';
import Categories from '../../Screens/Categories/Categories';
import Variant from '../../Screens/Variant/Variant';
import VariantDetail from '../../Screens/VariantDetail/VariantDetail';
import Setting from '../../Screens/Setting/Setting';






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
        <Stack.Screen name="Products" component={Products} options={{ headerShown: false }}  />
        <Stack.Screen name="ProductDetail" component={DetailProduct} options={{ headerShown: false }}  />
        <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }}  />
        <Stack.Screen name="Variants" component={Variant} options={{ headerShown: false }}  />
        <Stack.Screen name="VariantDetail" component={VariantDetail} options={{ headerShown: false }}  />
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }}  />


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

