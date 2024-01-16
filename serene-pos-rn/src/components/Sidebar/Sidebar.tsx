// Sidebar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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
        <Ionicons name="home" size={24} color={isActive('Home') ? 'white' : 'black'} style={{ marginVertical: 'auto', marginHorizontal: 10 }} />
        <Text style={[styles.menuItem, isActive('Home') && styles.activeMenuItemText]}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Profile') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Profile')}
      >
        <Ionicons name="person" size={24} color={isActive('Profile') ? 'white' : 'black'} style={{ marginVertical: 'auto', marginHorizontal: 10 }} />
        <Text style={[styles.menuItem, isActive('Profile') && styles.activeMenuItemText]}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Categories') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Categories')}
      >
        <Ionicons name="list" size={24} color={isActive('Categories') ? 'white' : 'black'} style={{ marginVertical: 'auto', marginHorizontal: 10 }} />
        <Text style={[styles.menuItem, isActive('Categories') && styles.activeMenuItemText]}>Categories</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          isActive('Inventory') && styles.activeMenuItemContainer,
        ]}
        onPress={() => navigateToScreen('Inventory')}
      >
        <Ionicons name="cube" size={24} color={isActive('Inventory') ? 'white' : 'black'} style={{ marginVertical: 'auto', marginHorizontal: 10 }} />
        <Text style={[styles.menuItem, isActive('Inventory') && styles.activeMenuItemText]}>Inventory</Text>
      </TouchableOpacity>
      </View>
      <View>
        <Text style={{marginBottom:20}}>serenePOS v1.00</Text>
      </View>

      {/* Add more menu items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '15%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '100%',
  },
  menuItemContainer: {
    // backgroundColor: '#ffffff',
    borderTopRightRadius: 20, // Border radius only on the top right
    borderBottomRightRadius: 20, 
    // borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    padding: 10
  },
  activeMenuItemContainer: {
    backgroundColor: '#2563EB',
  },
  menuItem: {
    color: 'black',
    fontSize: 18,
    padding: 10,
  },
  activeMenuItemText: {
    color: 'white',
  },
});

export default Sidebar;
