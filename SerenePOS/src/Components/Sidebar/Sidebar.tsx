// Sidebar.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

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
        {/* <Ionicons name="home" size={24} color={isActive('Home') ? 'white' : 'black'} style={{ marginVertical: 'auto', marginHorizontal: 10 }} /> */}
        <Text style={[styles.menuItem, isActive('Home') && styles.activeMenuItemText]}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Sales') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Sales')}
      >
        {/* <Ionicons name="home" size={24} color={isActive('Home') ? 'white' : 'black'} style={{ marginVertical: 'auto', marginHorizontal: 10 }} /> */}
        <Text style={[styles.menuItem, isActive('Sales') && styles.activeMenuItemText]}>Sales</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Profile') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Profile')}
      >
        {/* <Ionicons name="person" size={24} color={isActive('Profile') ? 'white' : 'black'} style={{ marginVertical: 'auto', marginHorizontal: 10 }} /> */}
        <Text style={[styles.menuItem, isActive('Profile') && styles.activeMenuItemText]}>Profile</Text>
      </TouchableOpacity>

      
      </View>
      <View>
        <Text style={{marginBottom:20, fontSize:10}}>serenePOS v1.00</Text>
      </View>

      {/* Add more menu items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
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
    padding: 1
  },
  activeMenuItemContainer: {
    backgroundColor: '#2563EB',
  },
  menuItem: {
    color: 'black',
    fontSize: 10,
    padding: 8,
  },
  activeMenuItemText: {
    color: 'white',
  },
});

export default Sidebar;