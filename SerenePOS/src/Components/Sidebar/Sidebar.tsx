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
  const [userDataMinimal, setUserDataMinimal] = React.useState({
    name:'',
    accountImage:''
  });


  const dataMinimal =  AsyncStorage.getItem('userDataMinimal')


  const fetchUser = async () => {
    try {
      // Retrieve userData from AsyncStorage
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue !== null) {
        setUserData(JSON.parse(jsonValue));
        // console.log(JSON.parse(jsonValue))
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
    console.log(dataMinimal)

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
        <DashboardSVG width='24' heigth='24' color={isActive('Home') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('Home') && styles.activeMenuItemText]}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Sales') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Sales')}
      >
        <SalesSVG width='24' heigth='24' color={isActive('Sales') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('Sales') && styles.activeMenuItemText]}>Sales</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          (isActive('Products') || isActive('ProductDetail')) && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Products')}
      >
        <ProductSVG width='24' heigth='24' color={(isActive('Products') || isActive('ProductDetail')) ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, (isActive('Products') || isActive('ProductDetail')) && styles.activeMenuItemText]}>Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Categories') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Categories')}
      >
        <CategoriesSVG width='24' height='24' color={isActive('Categories') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('Categories') && styles.activeMenuItemText]}>Categories</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          (isActive('Variants') || isActive('VariantDetail')) && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Variants')}
      >
        <VariantSVG width='24' height='24' color={(isActive('Variants') || isActive('VariantDetail')) ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, (isActive('Variants') || isActive('VariantDetail')) && styles.activeMenuItemText]}>Variant</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('TransactionHistory') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('TransactionHistory')}
      >
        <TransactionHistorySVG width='24' height='24' color={isActive('TransactionHistory') ? 'white' : 'black'}  />
        <Text style={[styles.menuItem, isActive('TransactionHistory') && styles.activeMenuItemText]}>Transaction</Text>
      </TouchableOpacity>

      </View>
      <View>

      <TouchableOpacity
        style={[
          styles.menuAccountContainer,
          //isActive('Account') && styles.activeMenuItemContainer,
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
    marginBottom: 8,
    flexDirection: 'row',
    paddingLeft: 10,
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
    height: 32,
  },
  menuItem: {
    color: 'black',
    paddingVertical: 6,
    paddingHorizontal:8
  },
  menuAccountItem: {
    color: 'black',
    paddingVertical: 6,
    paddingHorizontal:8
  },
  activeMenuItemText: {
    color: 'white',
  },
  circleAvatar: {
    width: 20,
    height: 20,
    fontSize: 10,
    padding:5,
    borderRadius: 20,
    backgroundColor: '#E1F0DA', // Change this to your desired background color
    color: 'black', // Change this to your desired text color
    textAlign: 'center',
    alignSelf:'center'
  },
});

export default Sidebar;