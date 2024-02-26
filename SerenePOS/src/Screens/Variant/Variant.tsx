import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { ApiUrls } from '../../apiUrls/apiUrls'
import TrashSVG from '../../assets/svgs/TrashSVG'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'
import Sidebar from '../../Components/Sidebar/Sidebar'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal'


  export interface Variant {
    ID: string;
    Name: string;
    Type: string;
    Count: number;
    ListLabel: string
  }

  export interface VariantDetailProps {
  details: DetailsVariant
  options: OptionsVariant[]
  product: ProductsVariant[]
  }

  export interface DetailsVariant {
    ID: string;
    Type: string
    Name: string;

  }

  export interface OptionsVariant {
    ID: string;
    Label: string;
    Price: string;
  }
  export interface ProductsVariant {
    ID: string;
    Name: string;
    ImgUrl: string;

  }

  export interface VariantForm {
    ID: string;
    Action: string
    Name?: string;
    Type?: string;
    optionID?: string;
    optionLabel?: string;
    optionPrice?: string
    ProductID?: string
    OptionIDDelete?: string

  }


const Variant = () => {

    const [variantsData, setVariantsData] = React.useState<Variant[]>([]);
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [deleteMode, setDeleteMode] = React.useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false);

    const navigation = useNavigation();

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
            // Registration successful
            Alert.alert('Success', 'Saved data successful!');
            onCloseConfirmation()
            setDeleteMode(false)
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

    React.useEffect(() => {
        fetchData();
      }, []);

  return (
    <CommonLayout>
      <View style={{}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginVertical:5, alignItems:'center'}}>
          <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Variants</Text>
          {deleteMode ? (
            <View/>
          ):(
            <View style={{flexDirection:'row', gap:4}}>
            <TouchableOpacity onPress={() => handleNavigate('')} style={{borderWidth:0.5, paddingHorizontal:13, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor: 'green'}}>
                <Text style={{fontWeight:'bold', fontSize:14, color:'black'}}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteModeToggle} style={{borderWidth:0.5, paddingHorizontal:13, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor:'red'}}>
                <TrashSVG width='12' height='12' color='red'/>
            </TouchableOpacity>
          </View>
          )}
          
          </View>
      {deleteMode && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>
              <Text style={{ fontSize: 10, marginRight: 5, color: 'black' }}>selected {selectedItems.length} product(s)</Text>
              <TouchableOpacity onPress={() => setSelectedItems([])}>
                <Text style={{ fontSize: 12, color: 'red' }}>Clear</Text>
              </TouchableOpacity>
            </View>
      )}
      <View>


      <View style={{flexDirection:'row',  flexWrap:'wrap',  alignItems:'center',  marginVertical:3}}>
        {variantsData.map((x, index)=>(
          <View key={index} style={{flexDirection:'row', padding:0, gap:0,  justifyContent:'center', alignItems:'center'}}>
            {deleteMode && (
                  <TouchableOpacity onPress={() => handleCheckboxPress(x.ID)} style={{ marginRight: 5 }}>
                    {selectedItems.includes(x.ID) ? (
                      <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'green' }}>✔</Text>
                    ) : (
                      <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>◻</Text>
                    )}
                  </TouchableOpacity>
                )}
            <TouchableOpacity onPress={() => handleNavigate(x.ID)} key={index} style={styles.firstRowItem}>
                <View style={{flexDirection:'row', justifyContent:'space-between', height:'40%'}}>
                <View >
                    <Text style={{fontWeight: "bold", color: "black", fontSize: 9, maxWidth:'99%'}}>{x.Name}</Text>
                    <Text style={{ color: "black", fontSize: 8, maxWidth:'99%'}}>{x.ListLabel}</Text>
                </View>
                    <Text style={{ color: "#2563EB", fontSize: 7, padding:3, borderWidth:0.5, borderColor:'#2563EB', borderRadius:3, width:80, height:18, textAlign:'center'}}>{x.Type == "1" ? 'Single' : 'Multi'} Selection</Text>
                </View>
                <View style={{marginTop:35}}>
                  <Text style={{fontSize:7, color:'black'}}>{x.Count} Linked Product</Text>
                </View>
            </TouchableOpacity>
            </View>
        ))}
      </View>

      {deleteMode && (
        <View style={{  flexDirection: 'row', justifyContent:'flex-end', gap:10, width: '100%', padding: 4, }}>
          <TouchableOpacity onPress={()=> onOpenConfirmation()}  style={{ backgroundColor: '#EF4444', borderRadius: 5, width:'45%', height:20, justifyContent:'center', alignItems:'center' }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize:8 }}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelPress} style={{ borderWidth:0.5, borderColor:'#2563EB', borderRadius: 5, width:'45%', height:20, justifyContent:'center', alignItems:'center' }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize:8 }}>Cancel</Text>
          </TouchableOpacity>
          
        </View>
      )}
      
      </View>
      </View>
      <ConfirmationModal isVisible={isOpenConfirmation} selectedItems={selectedItems} onClose={onCloseConfirmation} onSave={onSave} />

      
    </CommonLayout>
  )
}

const styles = StyleSheet.create({
    firstRowItem: {
      borderWidth:0.5,
      width:220, 
      height:90, 
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