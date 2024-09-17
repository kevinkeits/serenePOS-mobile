import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput, Dimensions } from 'react-native'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiUrls } from '../../apiUrls/apiUrls'
import { Outlet } from '../Setting/Setting'
import TrashSVG from '../../assets/svgs/TrashSVG'
import DetailModal from './components/DetailModal/DetailModal'
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal'


export interface Table {
  id: string;
  tableName: string;
  clientID: string;
  outletID: string;
  capacity: string;
  status: string
  qrUrl: string
}

export interface TableForm {
  id: string;
  action: string
  tableName?: string;
  capacity?: string;
}


const TableManagement = () => {

  const windowDimensions = Dimensions.get('window');
  const screenDimensions = Dimensions.get('screen');
  const [dimensions, setDimensions] = React.useState({
    window: windowDimensions,
    screen: screenDimensions,
  });


    const [tablesData, setTablesData] = React.useState<Table[]>([]);
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [deleteMode, setDeleteMode] = React.useState(false);
    const [isOpenDetail, setIsOpenDetail] = React.useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState<Table | null>(null);


    const navigation = useNavigation();

  


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

  const fetchData = async () => {
    console.log('[Table] fetching data')
    try {
      const token = await AsyncStorage.getItem('userData');     
      if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.get(ApiUrls.getTable, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });           
        const data: Table[] = response.data.data;
        setTablesData(data);
      } else {
        console.error('No token found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onSave = async (data: TableForm) => {
    try {
      const token = await AsyncStorage.getItem('userData'); 

      const url = ApiUrls.saveTable
      if (token) {
      const authToken = JSON.parse(token).data.Token
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.status === 200) {
        if (response.data.status) {
          setDeleteMode(false)
          onCloseDetail()
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

  const handleCancelPress = () => {
    setDeleteMode(false);
    setSelectedItems([]);
  };

  const onOpenDetail = (item?: Table) => {
    // fetchDetail(item?.id ?? '')
    setSelectedItemForEdit(item ?? null);
    setIsOpenDetail(true);
  };

  const onOpenConfirmation= () => {
    setIsOpenConfirmation(true);
  };

  const onCloseConfirmation = () => {
    setIsOpenConfirmation(false);
  };

  const onCloseDetail = () => {
    setIsOpenDetail(false);
  };

    


    React.useEffect(() => {
      fetchData()
      }, []);

  return (
    <CommonLayout>
      <View style={{}}>
      <View style={{flexDirection: 'row', gap:10,   marginRight:30, marginVertical:10, alignItems:'center'}}>
      <Text onPress={() => navigation.navigate('Account' as never)} style={{fontWeight:"bold",  marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>Account</Text>
      <Text style={{fontWeight:"bold",  marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>&gt;</Text>
      <Text onPress={() => navigation.navigate('Setting' as never)}  style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>Setting</Text>
      <Text style={{fontWeight:"bold",  marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>&gt;</Text>
      <Text onPress={() => navigation.goBack()} style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>Edit Outlet</Text>
      <Text style={{fontWeight:"bold",  marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>&gt;</Text>
      <Text style={{fontWeight:"bold",  marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Table Management</Text>
      </View>
     
      <View style={{}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginVertical:5, alignItems:'center'}}>
        <Text style={{fontWeight:"bold",  marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}></Text>
        {deleteMode ? (
          <View/>
        ):(
          <View style={{flexDirection:'row', gap:5}}>
          <TouchableOpacity onPress={() => onOpenDetail()} style={{borderWidth:0.5, paddingHorizontal:16, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor: '#D2D2D2'}}>
              <Text style={{fontSize: 22, color:'black'}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteModeToggle} style={{borderWidth:0.5, paddingHorizontal:13, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor:'#D2D2D2'}}>
              <TrashSVG width='22' height='22' color='red'/>
          </TouchableOpacity>
        </View>
        )}
      
      </View>


      <View style={{}}>

    <ScrollView style={{marginBottom:deleteMode ? 170 : 200}}>
      <View style={{flexDirection:'row',  flexWrap:'wrap',  alignItems:'center', marginVertical:3, marginLeft:15}}>
        {tablesData?.map((x, index)=>(
          <View key={index} style={{flexDirection:'row', padding:0,  justifyContent:'center', alignItems:'center'}}>
            {deleteMode && (
                  <TouchableOpacity onPress={() => handleCheckboxPress(x.id)} style={{}}>
                    {selectedItems.includes(x.id) ? (
                      <Text style={{ fontSize: 10, color: 'white', backgroundColor:'#2563EB', paddingHorizontal:2  }}>✔</Text>
                    ) : (
                      <Text style={{ fontSize: 24, color: 'black' }}>◻</Text>
                    )}
                  </TouchableOpacity>
                )}
            <TouchableOpacity 
            disabled={x.status == '0'}
            onPress={() => deleteMode ? handleCheckboxPress(x.id) : onOpenDetail(x)}  key={index} 
            style={[
              styles.firstRowItem,
              {backgroundColor: x.status == '0'? '#dfdfdf' : 'white'}
              ]}>
            <View style={{marginBottom:10, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontWeight: "bold", color: "black", textAlign:'center'}}>{x.tableName}</Text>
            <Text style={{ color: "black", fontSize: 10, marginBottom:5}}>Capacity {x.capacity}</Text>
            {x.status == '0' && (
            <Text style={{ color: "white", fontSize: 10, backgroundColor:'red', textAlign:'center', padding:4, borderRadius:10}}>Occupied</Text>
            )}

            </View>
          </TouchableOpacity>
            </View>
        ))}
      </View>

      {deleteMode && (
        <View style={{  flexDirection: 'row', gap:10, width: '100%',  justifyContent:'center', bottom:(dimensions.window.height < 400 ? (0) : (tablesData.length < 20 ? -40 : 50)) }}>
        <TouchableOpacity onPress={()=> selectedItems.length > 0 ? onOpenConfirmation() : ''}  style={{ backgroundColor: (selectedItems.length > 0 ? '#EF4444' : '#E0B9B9'), borderRadius: 5, width:'45%', height:32, justifyContent:'center', alignItems:'center' }}>
          <Text style={{ color: '#fff' }}>Delete ({selectedItems.length}) item{selectedItems.length > 1 ? 's' : ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancelPress} style={{ borderWidth:0.5, borderColor:'#dfdfdf', backgroundColor:'white', borderRadius: 5, width:'45%', height:32, justifyContent:'center', alignItems:'center' }}>
          <Text style={{ color: 'black' }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )}
    </ScrollView>

 

    
      </View>
      </View>
      </View>

      <DetailModal isVisible={isOpenDetail} selectedItem={selectedItemForEdit} onClose={onCloseDetail} onSave={onSave} />
      <ConfirmationModal isVisible={isOpenConfirmation} selectedItems={selectedItems} onClose={onCloseConfirmation} onSave={onSave} />

      
    </CommonLayout>
  )
}

const styles = StyleSheet.create({
    firstRowItem: {
      backgroundColor:"blue",
      justifyContent: 'center',
      width:120, 
      height:150, 
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
      //marginTop:10
    },
    quantityContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        //marginBottom: 10,
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
        //padding: 5,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 5,
        // marginHorizontal: 5,
      },
      quantityButtonText: {
        color: 'white',
        // fontSize: 10,
        fontWeight: 'bold',
      },
      quantityText: {
        // fontSize: 10,
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
        // fontSize: 8,
        width:50,
        color:'black'
      },
      servingInput: {
        height: 25,
        width: '60%',
        borderColor: 'gray',
        paddingVertical:5,
        paddingLeft: 8,
        // fontSize: 8,
        borderRadius:7,
        marginLeft:20
      },
    
  });

export default TableManagement