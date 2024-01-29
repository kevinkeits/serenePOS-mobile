import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchSVG from '../../assets/svgs/SearchSVG';

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
        <View style={{marginRight:10}}>
          <SearchSVG width='14' height='14' color='grey'/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical:'auto',
    padding: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563EB', // Header title color
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingLeft: 10,
    marginTop:5,
    height: 29,
    width: '40%',  // Adjust the width as needed
  },
  searchInput: {
    flex: 1,
    fontSize: 8,
    paddingRight: 10,
  },
});

export default CustomHeader;