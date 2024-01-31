import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import TrashSVG from '../../assets/svgs/TrashSVG'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'
import Sidebar from '../../Components/Sidebar/Sidebar'

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

const Setting = () => {

    const [coffeeData, setCoffeeData] = React.useState<Coffee[]>([]);
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [deleteMode, setDeleteMode] = React.useState(false);
    const [isOpenDetail, setIsOpenDetail] = React.useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState<Categories | null>(null);



    const navigation = useNavigation();

    const onOpenDetail = (item?: Categories) => {
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

    const data = [
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginVertical:10, alignItems:'center'}}>
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Setting</Text>
        <View/>
   
      
      </View>

      <View>


      <View style={{flexDirection:'row',  flexWrap:'wrap',  alignItems:'center', justifyContent:'center', marginVertical:3}}>
          <View  style={{flexDirection:'row', padding:0, gap:0,  justifyContent:'center', flexWrap:'wrap', alignItems:'center'}}>

        <TouchableOpacity    style={styles.firstRowItem}>
            <View style={{ marginHorizontal: 10}}>
                <Text style={{fontWeight: "bold", color: "white", fontSize: 12}}>Bussiness Information</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity    style={styles.firstRowItem}>
            <View style={{ marginHorizontal: 10}}>
                <Text style={{fontWeight: "bold", color: "white", fontSize: 12}}>Account</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity    style={styles.firstRowItem}>
            <View style={{ marginHorizontal: 10}}>
                <Text style={{fontWeight: "bold", color: "white", fontSize: 12}}>Receipt & Printing</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity    style={styles.firstRowItem}>
            <View style={{ marginHorizontal: 10}}>
                <Text style={{fontWeight: "bold", color: "white", fontSize: 12}}>Payment Method</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity    style={styles.firstRowItem}>
            <View style={{ marginHorizontal: 10}}>
                <Text style={{fontWeight: "bold", color: "white", fontSize: 12}}>Backup & Data Management</Text>
            </View>
        </TouchableOpacity>


            </View>
      </View>


      
      </View>
      </View>

      
    </CommonLayout>
  )
}

const styles = StyleSheet.create({
    firstRowItem: {
      backgroundColor:"blue",
      justifyContent: 'center',
      alignItems:'center',
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

export default Setting