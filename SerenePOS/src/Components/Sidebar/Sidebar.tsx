// Sidebar.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SalesSVG from '../../assets/svgs/SalesSVG';
import ProductSVG from '../../assets/svgs/ProductSVG';
import DashboardSVG from '../../assets/svgs/DashboardSVG';
import CategoriesSVG from '../../assets/svgs/CategoriesSVG';
import TransactionHistorySVG from '../../assets/svgs/TransactionHistorySVG';
import VariantSVG from '../../assets/svgs/VariantSVG';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Ionicons } from '@expo/vector-icons';

const Sidebar: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userData, setUserData] = React.useState<any>(null);

  const fetchUser = async () => {
    try {
      // Retrieve userData from AsyncStorage
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue !== null) {
        setUserData(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };
  
  const isActive = (screenName: string) => route.name === screenName;

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  const CircleAvatar = (accountName: string) => {
    const initials = accountName.split(' ').map(word => word[0]).join('').toUpperCase();
    return (
      <Text style={styles.circleAvatar}>
        {initials}
      </Text>
    );
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

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
        <DashboardSVG width='12' heigth='12' color={isActive('Home') ? 'white' : 'black'}  />
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
        <VariantSVG width='12' height='12' color={isActive('Variants') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('Variants') && styles.activeMenuItemText]}>Variants</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Outlet') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Outlet')}
      >
        <CategoriesSVG width='12' height='12' color={isActive('Outlet') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('Outlet') && styles.activeMenuItemText]}>Outlets</Text>
      </TouchableOpacity> */}

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

      {/* <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Setting') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Setting')}
      >
        <CategoriesSVG width='12' height='12' color={isActive('Setting') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('Setting') && styles.activeMenuItemText]}>Settings</Text>
      </TouchableOpacity> */}
{/* 
      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Account') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Account')}
      >
        <CategoriesSVG width='12' height='12' color={isActive('Account') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('Account') && styles.activeMenuItemText]}>Account</Text>
      </TouchableOpacity> */}

      
      </View>
      <View>

      <TouchableOpacity
        style={[
          styles.menuAccountContainer,
          isActive('Account') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Account')}
      >
        {userData && (
        CircleAvatar(userData?.data.Name)
        )}
        <Text style={styles.menuAccountItem}>{userData?.data.Name}</Text>
      </TouchableOpacity>


        <Text style={{marginBottom:10, fontSize:8, marginLeft:6}}>serenePOS v1.00</Text>
      </View>

      {/* Add more menu items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
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
  menuAccountContainer: {
    // backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth:0.5,
    borderColor:'#D2D2D2',
    paddingVertical:4,
    // borderRadius: 5,
    marginBottom: 10,
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
  menuAccountItem: {
    color: 'black',
    fontSize: 8,
    paddingVertical: 6,
    paddingHorizontal:8
  },
  activeMenuItemText: {
    color: 'white',
  },
  circleAvatar: {
    width: 20,
    height: 20,
    fontSize:6,
    padding:5,
    borderRadius: 20,
    backgroundColor: '#E1F0DA', // Change this to your desired background color
    color: 'black', // Change this to your desired text color
    textAlign: 'center',
    alignSelf:'center'
  },
});

export default Sidebar;