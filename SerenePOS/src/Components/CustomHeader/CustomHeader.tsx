import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
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
      <TouchableOpacity onPress={navigation.goBack} style={{marginLeft:10}}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <View>
            <Image
            source={require('../../assets/img/logoSerenePOS.png')}
            style={{width: 30, height: 30, resizeMode: 'cover', }}
              />
          </View>
          <Text style={styles.title}>serenePOS</Text>
          </View>
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
          <SearchSVG width='16' height='16' color='grey'/>
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
    marginLeft: 8,
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
    fontSize: 10,
    paddingTop: 8,
    paddingRight: 10,
  },
});

export default CustomHeader;