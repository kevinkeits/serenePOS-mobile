import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { ApiUrls } from '../../apiUrls/apiUrls'
import TrashSVG from '../../assets/svgs/TrashSVG'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'
import Sidebar from '../../Components/Sidebar/Sidebar'
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal'
import DetailModal from './components/DetailModal/DetailModal'

export interface Coffee {
    id: number;
    title: string;
    price: number;
    image: string;
  }

  export interface Categories {
    id: string;
    name: string;
    qtyAlert: string;
    bgColor?: string;
  }

  export interface CategoriesForm {
    id: string;
    action: string
    name?: string;
    qtyAlert?: string;
    bgColor?: string;
  }


const Categories = () => {



    const [categoriesData, setCategoriesData] = React.useState<Categories[]>([]);
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [deleteMode, setDeleteMode] = React.useState(false);
    const [isOpenDetail, setIsOpenDetail] = React.useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState<Categories | null>(null);



    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const onOpenDetail = (item?: Categories) => {
        // fetchDetail(item?.id ?? '')
        setSelectedItemForEdit(item ?? null);
        setIsOpenDetail(true);
      };
    
      const onCloseDetail = () => {
        setIsOpenDetail(false);
      };

      const onOpenConfirmation= () => {
        setIsOpenConfirmation(true);
      };
    
      const onCloseConfirmation = () => {
        setIsOpenConfirmation(false);
      };


      const fetchData = async () => {
        console.log('[Category] fetching data')
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
          } else {
            console.error('No token found in AsyncStorage');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const fetchDetail = async (id: string) => {
        try {
          const token = await AsyncStorage.getItem('userData'); 
          const categoryDetailUrl = ApiUrls.getCategoryDetail(id);    
          if (token) {
            const authToken = JSON.parse(token).data.Token
            const response = await axios.get(categoryDetailUrl, {
              headers: {
                'Authorization': `Bearer ${authToken}`
              }
            });           
            const data: Categories[] = response.data.data;
            setCategoriesData(data);
          } else {
            console.error('No token found in AsyncStorage');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const onSave = async (data: CategoriesForm) => {
          try {
            const token = await AsyncStorage.getItem('userData'); 
            const url = ApiUrls.saveCategory
            if (token) {
            const authToken = JSON.parse(token).data.Token
            const response = await axios.post(url, data, {
              headers: {
                'Authorization': `Bearer ${authToken}`
              }
            });
            if (response.status === 200) {
              // Registration successful
              Alert.alert('Success', 'Saved data successful!');
              onCloseDetail()
              fetchData()
            } else {
              // Registration failed
              Alert.alert('Error', 'Saving data failed');
            }
          }
          } catch (error) {
            console.error('Error during saving:', error);
            Alert.alert('Error', 'Something went wrong during saving data. Please try again.');
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

    // const data: Categories[] = [
    //     {
    //     id: '1',
    //     name: 'Coffee',
    //     qtyAlert: '3',
    //     bgColor: '#7653DA',
    //   },
    //   {
    //     id: '2',
    //     name: 'Non Coffee',
    //     qtyAlert: '5',
    //     bgColor: '#2925EB',
    //   },
    //   {
    //     id: '3',
    //     name: 'Food',
    //     qtyAlert: '10',
    //     bgColor: '#2563EB',
    //   },
    //   {
    //     id: '4',
    //     name: 'Main Course',
    //     qtyAlert: '8',
    //     bgColor: '#4AB8E8',
    //   },
    //   {
    //     id: '5',
    //     name: 'Signature',
    //     qtyAlert: '8',
    //     bgColor: '#E88C4A',
    //   },
    //   {
    //     id: '6',
    //     name: 'Dessert',
    //     qtyAlert: '9',
    //     bgColor: '#E84AD8',
    //   },
    //   {
    //     id: '7',
    //     name: 'Etc',
    //     qtyAlert: '6',
    //     bgColor: '#E84A4A',
    //   },
    // ];

    React.useEffect(() => {
        if (isFocused) fetchData();
      }, [isFocused]);

  return (
    <CommonLayout>
      <View style={{}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginVertical:5, alignItems:'center'}}>
        <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Categories</Text>
        {deleteMode ? (
          <View/>
        ):(
          <View style={{flexDirection:'row', gap:4}}>
          <TouchableOpacity onPress={() => onOpenDetail()} style={{borderWidth:0.5, paddingHorizontal:16, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor: '#D2D2D2'}}>
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
      <View>

    <ScrollView style={{marginBottom:50}}>
      <View style={{flexDirection:'row',  flexWrap:'wrap',  alignItems:'center', marginVertical:3, marginLeft:15}}>
        {categoriesData?.map((x, index)=>(
          <View key={index} style={{flexDirection:'row', padding:0, gap:0,  justifyContent:'center', alignItems:'center'}}>
            {deleteMode && (
                  <TouchableOpacity onPress={() => handleCheckboxPress(x.id)} style={{}}>
                    {selectedItems.includes(x.id) ? (
                      <Text style={{ fontSize: 12, color: 'white', backgroundColor:'#2563EB', paddingHorizontal:2  }}>✔</Text>
                    ) : (
                      <Text style={{ fontSize: 25, color: 'black' }}>◻</Text>
                    )}
                  </TouchableOpacity>
                )}
            <TouchableOpacity 
            onPress={() => deleteMode ? handleCheckboxPress(x.id) : onOpenDetail(x)}  key={index} 
            style={[
              styles.firstRowItem,
              {backgroundColor: x.bgColor}
              ]}>
            <View style={{marginBottom:10, marginLeft: 10}}>
            <Text style={{fontWeight: "bold", color: "white", fontSize: 12}}>{x.name}</Text>
            <Text style={{ color: "white", fontSize: 9}}>{x.qtyAlert} Items</Text>
            </View>
          </TouchableOpacity>
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
      </View>
      <DetailModal isVisible={isOpenDetail} selectedItem={selectedItemForEdit} onClose={onCloseDetail} onSave={onSave} />
      <ConfirmationModal isVisible={isOpenConfirmation} selectedItems={selectedItems} onClose={onCloseConfirmation} onSave={onSave} />

      
    </CommonLayout>
  )
}

const styles = StyleSheet.create({
    firstRowItem: {
     //backgroundColor:"blue",
      justifyContent: 'flex-end',
      width:130, 
      height:90, 
      borderRadius:7, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 8 }, 
      shadowOpacity: 0.3,  
      shadowRadius: 4,  
      elevation: 4,
      margin: 4,
    },
    scrollView: {
      flexDirection: 'row',
      //marginTop:10
    },
  });

export default Categories