import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'
import { Product } from '../Products/Products'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiUrls } from '../../apiUrls/apiUrls'




export interface Coffee {
    id: number;
    title: string;
    price: number;
    image: string;
  }

  export interface OptionsVariant {
    id: string;
    label: string;
    price: string;
  }

  export interface SelectedProduct {
    id: string;
    name: string;
    imgUrl: string
  }

  type DetailScreenProps = {
    route: { params: {  keyword: string } };
  };


const Search = ({ route }: DetailScreenProps) => {

    const  { keyword }  = route.params
    const [productData, setProductData] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);

  const fetchProduct = async (categoryID: string) => {
    try {
      const token = await AsyncStorage.getItem('userData'); 
      const urls = ApiUrls.getProduct(categoryID);    
      if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.get(urls, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });           
        const data: Product[] = response.data.data;
        const filteredData = data.filter((x) => x.name.toLowerCase().includes(keyword.toLowerCase()))
        console.log(keyword, filteredData)
        setProductData(filteredData);
        setLoading(false)
      } else {
        console.error('No token found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


const handleNavigate = ( selectedId: string) => {
  navigation.navigate('ProductDetail' as never, {id: selectedId} as never)
};

 
    const navigation = useNavigation();


    React.useEffect(() => {
      fetchProduct('')
      }, [keyword]);

  return (
    <CommonLayout>
      <ScrollView>
        <View>
        <Text style={{ fontSize:12, marginVertical: "auto", alignItems: 'center',  color:'black'}}>Search result for "{keyword}"</Text>

        <View style={{flexDirection:'row',  flexWrap:'wrap',  alignItems:'center',  marginVertical:3}}>
        {productData.map((x, index)=>(
          <View key={index} style={{flexDirection:'row', padding:0, gap:0,  justifyContent:'center', alignItems:'center'}}>

                {loading ? (
                  <View 
                  key={index}
                  style={styles.cardRowSkeleton} />
                  
                ):(
                    <TouchableOpacity 
                      key={index}
                      onPress={() => handleNavigate(x.id)} 
                      style={styles.cardRow}>
                  <View style={{width:'50%'}}>
                      <Image source={x.imgUrl !== '' ? { uri: x.imgUrl } : require('../../assets/img/no-image.png')} style={{width:'100%', height:'100%'}} />
                  </View>
                  <View style={{width:'50%'}}>
                      <Text style={{fontSize:8, fontWeight:'bold', maxWidth:'95%', color:'black'}}>{x.name}</Text>
                      <Text style={{fontSize:8, color: 'black' }}>Rp {parseInt(x.price).toLocaleString()}</Text>
                  </View>
              </TouchableOpacity>
                )}
            
            </View>
        ))}
      </View>
        </View>
      </ScrollView>

      
    </CommonLayout>
  )
}

const styles = StyleSheet.create({
    firstRowItem: {
      backgroundColor:"blue",
      justifyContent: 'flex-end',
      width:120, 
      height:70, 
      borderRadius:10, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 8 }, 
      shadowOpacity: 0.3,  
      shadowRadius: 4,  
      elevation: 4,
      margin: 5,
    },
    scrollView: {
      flexDirection: 'row',
    },
    quantityContainer: {
        flexDirection: 'row',
        width:'80%'
      },
      quantityButton: {
        backgroundColor: '#2563EB',
        padding:7,
        height:25,
        borderRadius: 3,
        
        marginHorizontal: 5,
      },
      quantityBorder: {
        borderWidth: 0.5,
       borderColor: '#D2D2D2',
        width:'100%',
        height:25,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 5,
      },
      quantityButtonText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
      },
      quantityText: {
        fontSize: 10,
        fontWeight: 'bold',
      },
      dropdownButton: {
        borderWidth: 1,
        padding: 10,
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        width:50
      },
      checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
      },
      checkboxInner: {
        width: 12,
        height: 12,
        borderRadius: 3,
        backgroundColor: '#2563EB',
      },
      checkboxLabel: {
        marginLeft: 8,
        fontSize: 8,
        width:50,
        color:'black'
      },
      servingInput: {
        height: 25,
        width: '60%',
        borderColor: 'gray',
        paddingVertical:5,
        paddingLeft: 8,
        fontSize: 8,
        borderRadius:7,
        marginLeft:20
      },
      addButton: {
        backgroundColor: '#2563EB',
        borderRadius: 5,
        marginBottom: 10,
        justifyContent:'center',
        width:25,
        height:25
      },
      optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap:5,
      },
      deleteButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
      },
      cardRowSkeleton: {
        padding:10, 
        gap:5,
        borderRadius:7,  
        height:100, 
        backgroundColor:'#D2D2D2',
        width:130, 
        margin: 4,
      },
      cardRow: {
        flexDirection:'row', 
        padding:10, 
        gap:5,
        borderWidth:0.5, 
        borderRadius:7,  
        height:100, 
        justifyContent:'center', 
        alignItems:'center',
        borderColor:'#D2D2D2',
        width:140, 
        margin: 4,
      },
  });

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: '#D2D2D2',
        borderRadius: 6,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: '#D2D2D2',
        borderRadius: 6,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 5,
        right: 15,
      },
});

export default Search