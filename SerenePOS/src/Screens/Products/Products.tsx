import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import TrashSVG from '../../assets/svgs/TrashSVG'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'
import Sidebar from '../../Components/Sidebar/Sidebar'
import ConfirmationModal from '../Categories/components/ConfirmationModal/ConfirmationModal'

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
    color?: string;
  }

const Products = () => {

    const [coffeeData, setCoffeeData] = React.useState<Coffee[]>([]);
    const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
    const [deleteMode, setDeleteMode] = React.useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false);


    const navigation = useNavigation();

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
    
      const handleCheckboxPress = (itemId: number) => {
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

      const handleNavigate = ( selectedData: Coffee | null) => {
        console.log(selectedData)
        navigation.navigate('ProductDetail', {data: selectedData})
      };

      const data: Categories[] = [
        {
        id: '1',
        name: 'Coffee',
        totalItem: '3',
        color: '#7653DA',
      },
      {
        id: '2',
        name: 'Non Coffee',
        totalItem: '5',
        color: '#2925EB',
      },
      {
        id: '3',
        name: 'Food',
        totalItem: '10',
        color: '#2563EB',
      },
      {
        id: '4',
        name: 'Main Course',
        totalItem: '8',
        color: '#4AB8E8',
      },
      {
        id: '5',
        name: 'Signature',
        totalItem: '8',
        color: '#E88C4A',
      },
      {
        id: '6',
        name: 'Dessert',
        totalItem: '9',
        color: '#E84AD8',
      },
      {
        id: '7',
        name: 'Etc',
        totalItem: '6',
        color: '#E84A4A',
      },
    ];

    React.useEffect(() => {
        fetchData();
      }, []);

  return (
    <CommonLayout>
      <View style={{}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginVertical:10, alignItems:'center'}}>
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Products</Text>
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
      <ScrollView horizontal style={styles.scrollView} showsHorizontalScrollIndicator={false}>
        {data.map((x, index) => (
            <TouchableOpacity key={index} 
            style={[
              styles.firstRowItem,
              {backgroundColor: x.color}
            ]}>
            <View style={{marginBottom:10, marginLeft: 10}}>
            <Text style={{fontWeight: "bold", color: "white", fontSize: 12}}>{x.name}</Text>
            <Text style={{ color: "white", fontSize: 9}}>{x.totalItem} Items</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{flexDirection:'row',  flexWrap:'wrap',  alignItems:'center', justifyContent:'center', marginVertical:3}}>
        {coffeeData.map((x, index)=>(
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
            <TouchableOpacity 
            key={index}
            onPress={() => handleNavigate(x)} 
            style={styles.cardRow}>
                <View style={{width:'50%'}}>
                    <Image source={{ uri: x.image }} style={{width:'100%', height:'100%'}} />
                </View>
                <View style={{width:'50%'}}>
                    <Text style={{fontSize:8, fontWeight:'bold', maxWidth:'95%', color:'black'}}>{x.title}</Text>
                    <Text style={{fontSize:8, color: 'black' }}>Rp {x.price}</Text>
                </View>
            </TouchableOpacity>
            </View>
        ))}
      </View>

      {deleteMode && (
        <View style={{  flexDirection: 'row', gap:10, justifyContent: 'flex-end', width: '100%', padding: 4, }}>
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
      backgroundColor:"blue",
      justifyContent: 'flex-end',
      width:130, 
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
      padding:10, 
      gap:5,
      borderWidth:0.5, 
      borderRadius:7,  
      height:100, 
      justifyContent:'center', 
      alignItems:'center',
      borderColor:'#D2D2D2',
      width:130, 
      margin: 4,
    },
    scrollView: {
      flexDirection: 'row',
      //marginTop:10
    },
  });

export default Products