import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import TrashSVG from '../../assets/svgs/TrashSVG'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'
import Sidebar from '../../Components/Sidebar/Sidebar'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal'

export interface Coffee {
    id: number;
    title: string;
    price: number;
    image: string;
  }

  export interface Categories {
    id: string;
    name: string;
    totalItem: string;
  }


const Variant = () => {

    const [coffeeData, setCoffeeData] = React.useState<Coffee[]>([]);
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [deleteMode, setDeleteMode] = React.useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false);

    const navigation = useNavigation();

    const handleNavigate = ( selectedData: Categories | null) => {
      console.log(selectedData)
      navigation.navigate('VariantDetail', {data: selectedData})
    };

      const onOpenConfirmation= () => {
        setIsOpenConfirmation(true);
      };
    
      const onCloseConfirmation = () => {
        setIsOpenConfirmation(false);
      };


    const fetchData = async () => {
        try {
          const response = await axios.get('https://fakestoreapi.com/products?limit=12');
          const data: Coffee[] = response.data;
          setCoffeeData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const handleProductPress = (selectedItem: Coffee) => {
        // Handle the press action for each product
        navigation.navigate('ProductDetail' as never);
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

    const data: Categories[] = [
        {
        id: '1',
        name: 'Coffee',
        totalItem: '3'
      },
      {
        id: '2',
        name: 'Non Coffee',
        totalItem: '5'
      },
      {
        id: '3',
        name: 'Food',
        totalItem: '10'
      },
      {
        id: '4',
        name: 'Main Course',
        totalItem: '8'
      },
      {
        id: '5',
        name: 'Signature',
        totalItem: '8'
      },
      {
        id: '6',
        name: 'Dessert',
        totalItem: '9'
      },
    ];

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
        <TouchableOpacity onPress={() => handleNavigate(null)} style={{borderWidth:0.5, paddingHorizontal:13, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor: 'green'}}>
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


      <View style={{flexDirection:'row',  flexWrap:'wrap',  alignItems:'center', justifyContent:'center', marginVertical:3}}>
        {data.map((x, index)=>(
          <View key={index} style={{flexDirection:'row', padding:0, gap:0,  justifyContent:'center', alignItems:'center'}}>
            {deleteMode && (
                  <TouchableOpacity onPress={() => handleCheckboxPress(x.id)} style={{ marginRight: 5 }}>
                    {selectedItems.includes(x.id) ? (
                      <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'green' }}>✔</Text>
                    ) : (
                      <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>◻</Text>
                    )}
                  </TouchableOpacity>
                )}
            <TouchableOpacity onPress={() => handleNavigate(x)} key={index} style={styles.firstRowItem}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <Text style={{fontWeight: "bold", color: "black", fontSize: 12}}>{x.name}</Text>
                    <Text style={{ color: "black", fontSize: 9}}>{x.totalItem} Items</Text>
                </View>
                    <Text style={{ color: "#2563EB", fontSize: 7, padding:3, borderWidth:0.5, borderColor:'#2563EB', borderRadius:3, width:50, height:18, textAlign:'center'}}>{x.name}</Text>
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
      <ConfirmationModal isVisible={isOpenConfirmation} totalItems={selectedItems.length} onClose={onCloseConfirmation} />

      
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