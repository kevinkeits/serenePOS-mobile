// Sidebar.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SalesSVG from '../../assets/svgs/SalesSVG';
import ProductSVG from '../../assets/svgs/ProductSVG';
import DashboardSVG from '../../assets/svgs/DashboardSVG';
import CategoriesSVG from '../../assets/svgs/CategoriesSVG';
import TransactionHistorySVG from '../../assets/svgs/TransactionHistorySVG';

// import { Ionicons } from '@expo/vector-icons';

const Sidebar: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const isActive = (screenName: string) => route.name === screenName;

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  return (
    <View style={styles.container}>
        <View>
      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Home') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Home')}
      >
        {/* <DashboardSVG width='12' heigth='12' color={isActive('Home') ? 'white' : 'black'}  /> */}
        <Text style={[styles.menuItem, isActive('Home') && styles.activeMenuItemText]}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Sales') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Sales')}
      >
        <SalesSVG width='12' heigth='12' color={isActive('Sales') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('Sales') && styles.activeMenuItemText]}>Sales</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Products') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Products')}
      >
        <ProductSVG width='12' heigth='12' color={isActive('Products') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('Products') && styles.activeMenuItemText]}>Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Categories') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Categories')}
      >
        <CategoriesSVG width='12' height='12' color={isActive('Categories') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('Categories') && styles.activeMenuItemText]}>Categories</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Variants') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Variants')}
      >
        <CategoriesSVG width='12' height='12' color={isActive('Variants') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('Variants') && styles.activeMenuItemText]}>Variants</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('TransactionHistory') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('TransactionHistory')}
      >
        <TransactionHistorySVG width='12' height='12' color={isActive('TransactionHistory') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('TransactionHistory') && styles.activeMenuItemText]}>Transaction History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Setting') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Setting')}
      >
        <CategoriesSVG width='12' height='12' color={isActive('Setting') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('Setting') && styles.activeMenuItemText]}>Settings</Text>
      </TouchableOpacity>

      
      </View>
      <View>
        <Text style={{marginBottom:20, fontSize:10, marginLeft:15}}>serenePOS v1.00</Text>
      </View>

      {/* Add more menu items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 2,
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '100%',
  },
  menuItemContainer: {
    // backgroundColor: '#ffffff',
    borderTopRightRadius: 10, // Border radius only on the top right
    borderBottomRightRadius: 10, 
    // borderRadius: 5,
    marginBottom: 2,
    flexDirection: 'row',
    paddingLeft: 10
  },
  activeMenuItemContainer: {
    backgroundColor: '#2563EB',
  },
  menuItem: {
    color: 'black',
    fontSize: 10,
    paddingVertical: 6,
    paddingHorizontal:8
  },
  activeMenuItemText: {
    color: 'white',
  },
});

export default Sidebar;