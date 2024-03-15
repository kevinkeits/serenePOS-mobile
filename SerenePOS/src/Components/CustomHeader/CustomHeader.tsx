import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchSVG from '../../assets/svgs/SearchSVG';

interface CustomHeaderProps {
  title?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {

  const navigation = useNavigation();


  const [textKeyword, setKeyword] = React.useState<string>('');

  const handleNavigate = ( keyword: string) => {
    navigation.navigate('Search' as never, {keyword: keyword} as never)
  };

  const handleSearch = () => {
    if (textKeyword.trim() !== '') {
      handleNavigate(textKeyword);
    } else {
      console.warn('Keyword cannot be empty');
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text style={styles.title}>serenePOS</Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput 
          placeholder="Search..."
          style={styles.searchInput}
          value={textKeyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSearch}
         />
        <TouchableOpacity style={{marginRight:10}} onPress={handleSearch}>
          <SearchSVG width='14' height='14' color='grey'/>
        </TouchableOpacity>
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
    color: '#2563EB', 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingLeft: 10,
    marginTop:5,
    height: 29,
    width: '40%',  
  },
  searchInput: {
    flex: 1,
    fontSize: 8,
    paddingRight: 10,
  },
});

export default CustomHeader;