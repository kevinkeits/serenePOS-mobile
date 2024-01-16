// CustomHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface CustomHeaderProps {
  title?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  const openProfileDrawer = () => {
    // Implement logic to open the profile drawer
    console.log('Opening profile drawer');
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text style={styles.title}>serenePOS</Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search..." style={styles.searchInput} />
        <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2563EB', // Header title color
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    width: 300,
    paddingRight: 10, // Add right padding to separate input and icon
  },
  searchIcon: {
    marginLeft: 8, // Move the search icon to the right side
  },
});

export default CustomHeader;
