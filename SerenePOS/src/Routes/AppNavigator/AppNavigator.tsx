import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../Screens/Home/Home';
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../../Screens/Profile/Profile';
import Sales from '../../Screens/Sales/Sales';
import Splash from '../../Screens/Splash/Splash';
import Login from '../../Screens/Login/Login';
import Products from '../../Screens/Products/Products';
import DetailProduct from '../../Screens/ProductDetail/DetailProduct';
import Categories from '../../Screens/Categories/Categories';
import Variant from '../../Screens/Variant/Variant';
import VariantDetail from '../../Screens/VariantDetail/VariantDetail';
import Setting from '../../Screens/Setting/Setting';
import PaymentMethodSetting from '../../Screens/PaymentMethodSetting/PaymentMethodSetting';
import BussinessInfoSetting from '../../Screens/BussinessInfoSetting/BussinessInfoSetting';
import TransactionHistory from '../../Screens/TransactionHistory/TransactionHistory';
import Outlet from '../../Screens/Outlet/Outlet';
import OutletDetail from '../../Screens/OutletDetail/OutletDetail';
import TransactionHistoryDetail from '../../Screens/TransactionHistoryDetail/TransactionHistoryDetail';
import SignUp from '../../Screens/SignUp/SignUp';
import Search from '../../Screens/Search/Search';
import TableManagement from '../../Screens/TableManagement/TableManagement';






const Stack = createStackNavigator();

const AppNavigator= () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ animationEnabled: false }}>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Account" component={Profile} options={{ headerShown: false }}  />
        <Stack.Screen name="Sales" component={Sales} options={{ headerShown: false }}  />
        <Stack.Screen name="Products" component={Products} options={{ headerShown: false }}  />
        <Stack.Screen name="ProductDetail" component={DetailProduct} options={{ headerShown: false }}  />
        <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }}  />
        <Stack.Screen name="Variants" component={Variant} options={{ headerShown: false }}  />
        <Stack.Screen name="VariantDetail" component={VariantDetail} options={{ headerShown: false }}  />
        <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerShown: false }}  />
        <Stack.Screen name="TransactionHistoryDetail" component={TransactionHistoryDetail} options={{ headerShown: false }}  />
        <Stack.Screen name="Outlet" component={Outlet} options={{ headerShown: false }}  />
        <Stack.Screen name="OutletDetail" component={OutletDetail} options={{ headerShown: false }}  />
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }}  />
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }}  />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodSetting} options={{ headerShown: false }}  />
        <Stack.Screen name="BussinessInformation" component={BussinessInfoSetting} options={{ headerShown: false }}  />
        <Stack.Screen name="TableManagement" component={TableManagement} options={{ headerShown: false }}  />



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

