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

    const onOpenDetail = () => {
        setIsOpenDetail(true);
      };
    
      const onCloseDetail = () => {
        setIsOpenDetail(false);
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

        <TouchableOpacity onPress={()=> navigation.navigate('BussinessInformation' as never)}     style={styles.firstRowItem}>
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

        <TouchableOpacity onPress={()=> navigation.navigate('PaymentMethod' as never)}   style={styles.firstRowItem}>
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
      backgroundColor:"#2563EB",
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