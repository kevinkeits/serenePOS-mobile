import React from 'react'
import { Button, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useNavigation, CommonActions } from '@react-navigation/native';
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

interface Coffee {
    id: number;
    title: string;
    price: number;
    image: string;
  }

const Sales = () => {

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
  
  const getCurrentDate = () => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return currentDate.toLocaleDateString(undefined, options);
  };

  const navigation = useNavigation();

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
      <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginVertical:20}}>
      <Text style={{fontWeight:"bold", fontSize:25, marginVertical: "auto"}}>Sales</Text>
      <Text style={{fontWeight:"bold", fontSize:17, borderWidth:2, padding:10, borderColor:"#ECEDF3", borderRadius:20}}>{getCurrentDate()}</Text>
      </View>

      <View style={{ marginHorizontal:"auto", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        {data.map((x, index) => (
            <TouchableOpacity key={index} style={index < 3 ? styles.firstRowItem : styles.otherRowsItem}>
            <View style={{marginBottom:40, marginLeft: 60, gap: 10}}>
            <Text style={{fontWeight: "bold", color: "white", fontSize: 23}}>{x.name}</Text>
            <Text style={{ color: "white", fontSize: 18}}>{x.totalItem} Items</Text>
            </View>
          </TouchableOpacity>
        ))}
      
      {/* <View style={{backgroundColor:"ffffff", borderWidth:2, justifyContent: 'flex-end', borderColor:"blue", width:420, height:300, borderRadius:15, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3,  shadowRadius: 4,  elevation: 4}}>
      <View style={{marginBottom:40, marginLeft: 60, gap: 10}}>
        <Text style={{fontWeight: "bold", color: "blue", fontSize: 18}}>Today's Sales</Text>
        <Text style={{fontWeight: "bold", color: "blue", fontSize: 23}}>Rp. 85,000</Text>
        </View>
      </View>
      <View style={{backgroundColor:"green", width:420, height:300, borderRadius:15, justifyContent: 'flex-end',  shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3,  shadowRadius: 4,  elevation: 4}}>
      <View style={{marginBottom:40, marginLeft: 60, gap: 10}}>
        <View style={{flexDirection:"row"}}>
        <Ionicons name="arrow-up" size={24} color="white"  />
        <Text style={{fontWeight: "bold", color: "white", fontSize: 23, marginLeft:10}}>+ 10%</Text>
        </View>
        <Text style={{fontWeight: "bold", color: "white", fontSize: 18}}>Over Last Week</Text>
        </View>
      </View> */}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginTop:20}}>
      <Text style={{fontWeight:"bold", fontSize:25, marginVertical: "auto"}}>Coffee</Text>
      <Text style={{fontWeight:"bold", fontSize:17, borderWidth:2, padding:10, borderColor:"#ECEDF3", borderRadius:20}}></Text>
      </View>
<View style={{justifyContent:'center', alignItems: 'center', marginTop:10, marginBottom:20}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
      {coffeeData.map((x) => (
        <TouchableOpacity key={x.id} style={styles.card}>
          <Image source={{ uri: x.image }} style={styles.image} />
          <Text style={styles.title}>{x.title}</Text>
          <Text style={styles.price}>${x.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </View>



    </View>
    </CommonLayout>
  )
}

const styles = StyleSheet.create({
  firstRowItem: {
    backgroundColor:"blue",
    justifyContent: 'flex-end',
    width:350, 
    height:200, 
    borderRadius:15, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.3,  
    shadowRadius: 4,  
    elevation: 4,
    margin: 5,
  },
  otherRowsItem: {
    backgroundColor:"blue", 
    width:350, 
    height:200, 
    borderRadius:15, 
    justifyContent: 'flex-end',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.3,  
    shadowRadius: 4,  
    elevation: 4,
    marginTop: 15, // Add extra margin to create a new row
    marginHorizontal: 5,
  },
  scrollView: {
    flexDirection: 'row',
    marginTop:20
  },
  card: {
    marginRight: 10,
    borderWidth: 1,
    width:250, 
    height:250, 
    borderRadius:15, 
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius:15, 

  },
  title: {
    padding: 10,
    textAlign: 'center',
    fontSize: 12,
  },
  price: {
    paddingVertical: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Sales
