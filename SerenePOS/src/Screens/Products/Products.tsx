import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { ApiUrls } from '../../apiUrls/apiUrls'
import TrashSVG from '../../assets/svgs/TrashSVG'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Categories } from '../Categories/Categories'
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal'

export interface Product {
    id: string;
    name: string;
    price: string;
    notes: string;
    imgUrl: string
    qty: number
  }

export interface ProductDetail {
   product: headerProduct
   variant: selVariantProduct[]
  }

  export interface headerProduct {
    id: string;
    productSKU: string
    name: string;
    price: string;
    categoryID: string
    categoryName: string
    qty: number
    notes: string;
    imgUrl: string
    mimeType: string
 
  }
  export interface selVariantProduct {
    productVariantOptionID: string;
    isSelected: string;
    variantID: string;
    name: string;
    type: string;
    variantOptionID: string;
    label: string;
    price: string;
  }

  export interface ProductForm {
    id: string;
    action: string
    name?: string;
    notes?: string;
    qty?: number;
    price?: number;
    categoryID?: string
    productSKU?: string
    fileName?: string
    fileData?: string
    variantOptionID?: string
    isSelected?: string
    productVariantOptionID?: string
  }

const Products = () => {
    const isFocused = useIsFocused();

    const [productData, setProductData] = React.useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = React.useState<string>('');
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [deleteMode, setDeleteMode] = React.useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [categoriesData, setCategoriesData] = React.useState<Categories[]>([]);




    const navigation = useNavigation();

    const onOpenConfirmation= () => {
      setIsOpenConfirmation(true);
    };
  
    const onCloseConfirmation = () => {
      setIsOpenConfirmation(false);
    };


    const fetchData = async (categoryID: string) => {
      try {
        setSelectedCategory(categoryID)
        const token = await AsyncStorage.getItem('userData'); 
        const categoryDetailUrl = ApiUrls.getProduct(categoryID);    
        if (token) {
          const authToken = JSON.parse(token).data.Token
          const response = await axios.get(categoryDetailUrl, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });           
          const data: Product[] = response.data.data;
          setProductData(data);
          setLoading(false)
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem('userData');     
        if (token) {
          const authToken = JSON.parse(token).data.Token
          const response = await axios.get(ApiUrls.getCategory, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });           
          const data: Categories[] = response.data.data;
          setCategoriesData(data);
          if (data.length > 0) fetchData(data[0].id)
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
      const handleCheckboxPress = (itemId: string) => {
        // Toggle the selection status of the item
        setSelectedItems((prevSelectedItems) => {
          if (prevSelectedItems.includes(itemId)) {
            // If the item is already selected, remove it from the list
            return prevSelectedItems.filter((id) => id !== itemId);
          } else {
            // If the item is not selected, add it to the list
            return [...prevSelectedItems, itemId];
          }
        });
      };

      const onSave = async (data: ProductForm) => {
        try {
          const token = await AsyncStorage.getItem('userData'); 
          const url = ApiUrls.saveProduct
          if (token) {
          const authToken = JSON.parse(token).data.Token
          const response = await axios.post(url, data, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          if (response.status === 200) {
            if (response.data.status) {
              onCloseConfirmation()
              setDeleteMode(false)
              fetchData(selectedCategory)
            } else {
              Alert.alert('Error', response.data.message);
            }
          } else {
            Alert.alert('Error', 'Saving data failed');
          }
        }
        } catch (error) {
          console.error('Error during saving:', error);
          Alert.alert('Error', 'Something went wrong during saving data. Please try again.');
        }
    };
    
      const handleDeleteModeToggle = () => {
        setDeleteMode((prevDeleteMode) => !prevDeleteMode);
        // Clear the selected items when exiting delete mode
        if (!deleteMode) {
          setSelectedItems([]);
        }
      };

      const handleCancelPress = () => {
        setDeleteMode(false);
        setSelectedItems([]);
      };

      // const handleNavigate = ( selectedData: ProductDetail | null) => {
      //   console.log(selectedData)
      //   navigation.navigate('ProductDetail' as never, {data: selectedData} as never)
      // };

      const handleNavigate = ( selectedId: string) => {
        navigation.navigate('ProductDetail' as never, {id: selectedId} as never)
      };

    React.useEffect(() => {
      if (isFocused) fetchCategories();
    }, [isFocused]);

  return (
    <CommonLayout>
      <View style={{}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginVertical:5, alignItems:'center'}}>
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Products</Text>
      {deleteMode ? (
        <View/>
      ):(
        <View style={{flexDirection:'row', gap:4}}>
        <TouchableOpacity onPress={() => handleNavigate('')} style={{borderWidth:0.5, paddingHorizontal:16, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor: '#D2D2D2'}}>
            <Text style={{fontWeight:'bold', fontSize:14, color:'black'}}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteModeToggle} style={{borderWidth:0.5, paddingHorizontal:13, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor:'#D2D2D2'}}>
            <TrashSVG width='12' height='12' color='red'/>
        </TouchableOpacity>
      </View>
      )}
      
      </View>
      {/* {deleteMode && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>
              <Text style={{ fontSize: 10, marginRight: 5, color: 'black' }}>selected {selectedItems.length} product(s)</Text>
              <TouchableOpacity onPress={() => setSelectedItems([])}>
                <Text style={{ fontSize: 12, color: 'red' }}>Clear</Text>
              </TouchableOpacity>
            </View>
      )} */}
          <ScrollView horizontal style={styles.scrollView} showsHorizontalScrollIndicator={false}>
        {categoriesData.map((x, index) => (
            <TouchableOpacity key={index} 
            onPress={() => fetchData(x.id)}
            style={[
              styles.firstRowItem,
              {backgroundColor: x.bgColor}
            ]}>
            <View style={{marginBottom:10, marginLeft: 10}}>
            <Text style={{fontWeight: "bold", color: "white", fontSize: 12}}>{x.name}</Text>
            <Text style={{ color: "white", fontSize: 9}}>{x.totalItem} Item{parseInt(x.totalItem) > 0 ? 's' : ''}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

          <ScrollView >
        {/* <View>
        
        </View> */}
      
      <View style={{flexDirection:'row',  flexWrap:'wrap',  alignItems:'center', marginBottom: 50}}>
        {productData.map((x, index)=>(
          <View key={index} style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            {deleteMode && (
                  <TouchableOpacity onPress={() => handleCheckboxPress(x.id)} style={{}}>
                  {selectedItems.includes(x.id) ? (
                    <Text style={{ fontSize: 12, color: 'white', backgroundColor:'#2563EB', paddingHorizontal:2  }}>✔</Text>
                  ) : (
                    <Text style={{ fontSize: 25, color: 'black' }}>◻</Text>
                  )}
                </TouchableOpacity>
                )}

                {loading ? (
                  <View 
                  key={index}
                  style={styles.cardRowSkeleton} />
                  
                ):(
                    <TouchableOpacity 
                      key={index}
                      onPress={() => deleteMode ? handleCheckboxPress(x.id) : handleNavigate(x.id)} 
                      style={x.qty < 1 ? [styles.cardRow, {   backgroundColor: 'black', opacity:0.5, zIndex:0 }] : styles.cardRow}>
                      
                      {x.qty < 1 && (
                        <View style={{ position:'absolute', zIndex:1, alignItems:'center'}}>
                          <Text style={{color:'white', alignSelf:'center', textAlign:'center', backgroundColor:'black', padding:5, borderRadius:5, fontSize:10 }}>Out of stock</Text>
                        </View>
                        )}
                  <View style={{width:'60%', marginLeft:5}}>
                      <Image source={x.imgUrl !== '' ? { uri: x.imgUrl } : require('../../assets/img/no-image.png')} style={{width:'100%', height:'100%', borderRadius:5}} />
                  </View>
                  <View style={{width:'50%'}}>
                      <Text style={{fontSize:8, fontWeight:'bold', maxWidth:'95%', color:'black'}}>{x.name}</Text>
                      <Text style={{fontSize:6, color: 'black' }}>Rp {parseInt(x.price).toLocaleString()}</Text>
                  </View>
              </TouchableOpacity>
                )}
            
            </View>
        ))}
      </View>
      </ScrollView>
    
      
      {deleteMode && (
        <View style={{  flexDirection: 'row', gap:10, width: '100%', padding: 4, justifyContent:'center',position:'absolute', bottom:50 }}>
        <TouchableOpacity onPress={()=> selectedItems.length > 0 ? onOpenConfirmation() : ''}  style={{ backgroundColor: (selectedItems.length > 0 ? '#EF4444' : '#E0B9B9'), borderRadius: 5, width:'45%', height:20, justifyContent:'center', alignItems:'center' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize:8 }}>Delete ({selectedItems.length}) item{selectedItems.length > 1 ? 's' : ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancelPress} style={{ borderWidth:0.5, borderColor:'#dfdfdf', backgroundColor:'white', borderRadius: 5, width:'45%', height:20, justifyContent:'center', alignItems:'center' }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize:8 }}>Cancel</Text>
        </TouchableOpacity>
        
      </View>
      )}


      

      </View>
      <ConfirmationModal isVisible={isOpenConfirmation} onClose={onCloseConfirmation} selectedItems={selectedItems} onSave={onSave} />

      
    </CommonLayout>
  )
}

const styles = StyleSheet.create({
    firstRowItem: {
      backgroundColor:"blue",
      justifyContent: 'flex-end',
      width:150, 
      height:60,
      borderRadius:7, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 8 }, 
      shadowOpacity: 0.3,  
      shadowRadius: 4,  
      elevation: 4,
      margin: 4,
    },
    cardRow: {
      flexDirection:'row', 
      paddingHorizontal:8, 
      //paddingVertical:6,
      gap:8,
      borderWidth:0.5, 
      borderRadius:7,  
      height:80, 
      justifyContent:'center', 
      alignItems:'center',
      borderColor:'#D2D2D2',
      width:140, 
      margin: 8,
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
    scrollView: {
      flexDirection: 'row',
      //marginTop:10
    },
  });

export default Products