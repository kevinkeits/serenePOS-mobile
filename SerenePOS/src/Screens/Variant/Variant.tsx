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

  export interface Variants {
    id: string;
    name: string;
    type: string;
    count: number;
  }


const Variant = () => {

    const [coffeeData, setCoffeeData] = React.useState<Coffee[]>([]);
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [deleteMode, setDeleteMode] = React.useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false);

    const navigation = useNavigation();

    const handleNavigate = ( selectedData: Variants | null) => {
      navigation.navigate('VariantDetail' as never, {data: selectedData} as never)
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

    const data: Variants[] = [
      {
        id : "329cbb0e-646e-45e8-8643-22cd12245e79",
        name: "Serving",
        type: "1",
        count: 0
    },
    {
        id: "93ca4c5d-bd04-4855-8fc6-759b3bf9a0e4",
        name: "Sugar",
        type: "1",
        count: 0
    },
    {
        id: "c24c993d-6e18-4c0e-8131-5a1cd6e0ead5",
        name: "Pilihan Es",
        type: "2",
        count: 0
    },
    {
        id: "204b3027-ab90-4fff-8f22-d089e016aceb",
        name: "Pilihan Kopi",
        type: "2",
        count: 0
    },
    {
        id: "12bfefd0-75f4-489a-b7d3-a5d0c435f924",
        name: "Pilihan Susu",
        type: "2",
        count: 0
    },
    {
        id: "33797aa4-f3c0-4437-9871-f38278f979ba",
        name: "Add On",
        type: "2",
        count: 0
    }
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
                    <Text style={{ color: "black", fontSize: 8}}>Normal, More, Less</Text>
                </View>
                    <Text style={{ color: "#2563EB", fontSize: 7, padding:3, borderWidth:0.5, borderColor:'#2563EB', borderRadius:3, width:80, height:18, textAlign:'center'}}>{x.type == "1" ? 'Single' : 'Multi'} Selection</Text>
                </View>
                <View style={{marginTop:35}}>
                  <Text style={{fontSize:7, color:'black'}}>{x.count} Linked Product</Text>
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