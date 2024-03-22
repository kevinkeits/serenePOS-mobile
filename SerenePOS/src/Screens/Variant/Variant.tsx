import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Dimensions, Text, View, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { ApiUrls } from '../../apiUrls/apiUrls'
import TrashSVG from '../../assets/svgs/TrashSVG'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'
import Sidebar from '../../Components/Sidebar/Sidebar'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal'


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

  export interface Variant {
    id: string;
    name: string;
    type: string;
    count: number;
    listLabel: string
  }

  export interface VariantDetailProps {
  details: DetailsVariant
  options: OptionsVariant[]
  product: ProductsVariant[]
  }

  export interface DetailsVariant {
    id: string;
    type: string
    name: string;

  }

  export interface OptionsVariant {
    id: string;
    label: string;
    price: string;
  }
  export interface ProductsVariant {
    id: string;
    name: string;
    imgUrl: string;

  }

  export interface VariantForm {
    id: string;
    action: string
    name?: string;
    type?: string;
    optionID?: string;
    optionLabel?: string;
    optionPrice?: string
    productID?: string
    optionIDDelete?: string
  }


const Variant = () => {
  const [dimensions, setDimensions] = React.useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

    const [variantsData, setVariantsData] = React.useState<Variant[]>([]);
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [deleteMode, setDeleteMode] = React.useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const handleNavigate = ( selectedID: string) => {
      navigation.navigate('VariantDetail' as never, {id: selectedID} as never)
    };

      const onOpenConfirmation= () => {
        setIsOpenConfirmation(true);
      };
    
      const onCloseConfirmation = () => {
        setIsOpenConfirmation(false);
      };


      const fetchData = async () => {
        console.log('[Variant] fetching data')
        try {
          const token = await AsyncStorage.getItem('userData');     
          if (token) {
            const authToken = JSON.parse(token).data.Token
            const response = await axios.get(ApiUrls.getVariant, {
              headers: {
                'Authorization': `Bearer ${authToken}`
              }
            });           
            const data: Variant[] = response.data.data;
            setVariantsData(data);
          } else {
            console.error('No token found in AsyncStorage');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const onSave = async (data: VariantForm) => {
        try {
          const token = await AsyncStorage.getItem('userData'); 
          const url = ApiUrls.saveVariant
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
              fetchData()
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

    React.useEffect(() => {
      if (isFocused) fetchData();
      }, [isFocused]);

  return (
    <CommonLayout>
      <View style={{}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginVertical:5, alignItems:'center'}}>
          <Text style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Variant</Text>
          {deleteMode ? (
            <View/>
          ):(
            <View style={{flexDirection:'row', gap:4}}>
            <TouchableOpacity onPress={() => handleNavigate('')} style={{borderWidth:0.5, paddingHorizontal:16, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor: '#D2D2D2'}}>
                <Text style={{fontSize: 22, color:'black'}}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteModeToggle} style={{borderWidth:0.5, paddingHorizontal:13, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor:'#D2D2D2'}}>
                <TrashSVG width='22' height='22' color='red'/>
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
      

      <ScrollView style={{marginBottom:70}}>
      <View style={{flexDirection:'row',  flexWrap:'wrap', alignItems:'center',  marginVertical:7, marginLeft:7}}>
        {variantsData.map((x, index)=>(
          <View key={index} style={{flexDirection:'row', padding:8, gap:0,  justifyContent:'center', alignItems:'center'}}>
            {deleteMode && (
                  <TouchableOpacity onPress={() => handleCheckboxPress(x.id)} style={{}}>
                    {selectedItems.includes(x.id) ? (
                      <Text style={{ fontSize: 12, color: 'white', backgroundColor:'#2563EB', paddingHorizontal:2  }}>✔</Text>
                    ) : (
                      <Text style={{ fontSize: 24, color: 'black' }}>◻</Text>
                    )}
                  </TouchableOpacity>
                )}
            <TouchableOpacity onPress={() => deleteMode ? handleCheckboxPress(x.id) : handleNavigate(x.id)} key={index} style={styles.firstRowItem}>
                <View style={{flexDirection:'row', justifyContent:'space-between', height:'40%'}}>
                <View >
                    <Text style={{fontWeight: "bold", color: "black",  maxWidth:'100%'}}>{x.name}</Text>
                    <Text style={{ color: "black", maxWidth:110}}>{x.listLabel}</Text>
                </View>
                    {/* <Text style={{ color: "black", padding:3, borderWidth:0.5, borderColor:'#D2D2D2', borderRadius:3, width:80, height:18, textAlign:'center'}}>{x.type == "1" ? 'Single' : 'Multi'} Selection</Text> */}
                </View>
                <View style={{marginTop:35}}>
                  <Text style={{color:'#dfdfdf'}}>{x.count} Linked Product{x.count > 1 ? 's' : ''}</Text>
                </View>
            </TouchableOpacity>
            </View>
        ))}
      </View>
      </ScrollView>
      {deleteMode && (
        <View style={{  flexDirection: 'row', gap:10, width: '100%', padding: 4, justifyContent:'center',position:'absolute', bottom:20 }}>
        <TouchableOpacity onPress={()=> selectedItems.length > 0 ? onOpenConfirmation() : ''}  style={{ backgroundColor: (selectedItems.length > 0 ? '#EF4444' : '#E0B9B9'), borderRadius: 5, width:'45%', height:32, justifyContent:'center', alignItems:'center' }}>
          <Text style={{ color: '#fff' }}>Delete ({selectedItems.length}) item{selectedItems.length > 1 ? 's' : ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancelPress} style={{ borderWidth:0.5, borderColor:'#dfdfdf', backgroundColor:'white', borderRadius: 5, width:'45%', height:32, justifyContent:'center', alignItems:'center' }}>
          <Text style={{ color: 'black' }}>Cancel</Text>
        </TouchableOpacity>
        
      </View>
      )}


      </View>
      <ConfirmationModal isVisible={isOpenConfirmation} selectedItems={selectedItems} onClose={onCloseConfirmation} onSave={onSave} />

      
    </CommonLayout>
  )
}

const styles = StyleSheet.create({
    firstRowItem: {
      borderWidth:0.5,
      width:210, 
      height:100, 
      borderRadius:7, 
      borderColor: '#D2D2D2',
      backgroundColor: '#FFF',
      shadowColor: '#9C9C9C',
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 2,
      margin: 4,
      paddingHorizontal:10,
      paddingVertical:5,
    },
    scrollView: {
      flexDirection: 'row',
      //marginTop:10
    },
  });

export default Variant