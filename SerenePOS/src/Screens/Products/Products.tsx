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

const Products = () => {

    const [coffeeData, setCoffeeData] = React.useState<Coffee[]>([]);

    const fetchData = async () => {
        try {
          const response = await axios.get('https://fakestoreapi.com/products?limit=5');
          const data: Coffee[] = response.data;
          setCoffeeData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
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
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center'}}>Products</Text>
      <View style={{flexDirection:'row', gap:4}}>
        <TouchableOpacity style={{borderWidth:0.5, paddingHorizontal:13, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor: 'green'}}>
            <Text style={{fontWeight:'bold', fontSize:14, color:'black'}}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth:0.5, paddingHorizontal:13, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor:'red'}}>
            <TrashSVG width='12' height='12' color='red'/>
        </TouchableOpacity>
      </View>
      </View>
      <View>
      <ScrollView horizontal style={styles.scrollView} showsHorizontalScrollIndicator={false}>
        {data.map((x, index) => (
            <TouchableOpacity key={index} style={styles.firstRowItem}>
            <View style={{marginBottom:10, marginLeft: 10}}>
            <Text style={{fontWeight: "bold", color: "white", fontSize: 12}}>{x.name}</Text>
            <Text style={{ color: "white", fontSize: 9}}>{x.totalItem} Items</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{flexDirection:'row', gap:10, flexWrap:'wrap',  alignItems:'center'}}>
        {coffeeData.map((x, index)=>(
            <TouchableOpacity key={index} style={{flexDirection:'row', padding:10, gap:5,borderWidth:0.5, borderRadius:10, width:'31%', height:100, justifyContent:'center', alignItems:'center'}}>
                <View style={{width:'50%'}}>
                    <Image source={{ uri: x.image }} style={{width:40, height:40}} />
                </View>
                <View style={{width:'50%'}}>
                    <Text style={{fontSize:10, fontWeight:'bold', maxWidth:'80%'}}>{x.title}</Text>
                    <Text style={{fontSize:8, fontWeight:'bold'}}>Rp {x.price}</Text>
                </View>
            </TouchableOpacity>
        ))}
      </View>
      </View>

      

      </View>

      
    </CommonLayout>
  )
}

const styles = StyleSheet.create({
    firstRowItem: {
      backgroundColor:"blue",
      justifyContent: 'flex-end',
      width:120, 
      height:70, 
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
  });

export default Products