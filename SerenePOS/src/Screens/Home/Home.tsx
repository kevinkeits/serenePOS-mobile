import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import { ApiUrls } from '../../apiUrls/apiUrls'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'
import Sidebar from '../../Components/Sidebar/Sidebar'
import SalesChart from './components/SalesChart/SalesChart'

export interface IProfitAmount {
  thisWeekAmount: string;
  lastWeekAmount: string;
  profitPercentage: number;
}


export interface ITopSelling {
  totalQty: string;
  productID: string;
  productName: string
  imgUrl: string;
}

export interface ISalesWeekly {
  paymentAmount: string;
  transactionDay: string;
}


const Home = () => {

  const isFocused = useIsFocused();


  const [todayIncome, setTodayIncome] = React.useState<string>('');
  const [totalIncome, setTotalIncome] = React.useState<string>('');
  const [topSelling, setTopSelling] = React.useState<ITopSelling[]>([]);
  const [salesWeekly, setSalesWeekly] = React.useState<ISalesWeekly[]>([]);
  const [profitAmount, setProfitAmount] = React.useState<IProfitAmount | null>(null);





  const getCurrentDate = () => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
    return currentDate.toLocaleDateString;
  };

  const fetchTodayIncome = async () => {
    try {
      console.log('[Dashboard] fetching today income')
      const token = await AsyncStorage.getItem('userData');     
      if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.get(ApiUrls.getDashboardTodayIncome, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });           
        const data:string = response.data.data;
        setTodayIncome(data)

      } else {
        console.error('No token found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTotalIncome = async () => {
    try {
      console.log('[Dashboard] fetching total income')
      const token = await AsyncStorage.getItem('userData');     
      if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.get(ApiUrls.getDashboardTotalIncomeForMonth, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });           
        const data:string = response.data.data;
        setTotalIncome(data)

      } else {
        console.error('No token found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTopSelling = async () => {
    try {
      console.log('[Dashboard] fetching total income')
      const token = await AsyncStorage.getItem('userData');     
      if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.get(ApiUrls.getDashboardTopSellings, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });           
        const data: ITopSelling[] = response.data.data;
        setTopSelling(data)

      } else {
        console.error('No token found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchSalesWeekly = async () => {
    try {
      console.log('[Dashboard] fetching sales weekly')
      const token = await AsyncStorage.getItem('userData');     
      if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.get(ApiUrls.getDashboardSalesWeekly, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });           
        const data: ISalesWeekly[] = response.data.data;
        // console.log(data)
        setSalesWeekly(data)

      } else {
        console.error('No token found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchProfitAmount = async () => {
    try {
      console.log('[Dashboard] fetching total income')
      const token = await AsyncStorage.getItem('userData');     
      if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.get(ApiUrls.getDashboardProfitAmount, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });           
        const data: IProfitAmount = response.data.data;
        setProfitAmount(data)

      } else {
        console.error('No token found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    if (isFocused) { 
      fetchTodayIncome()
      fetchTotalIncome()
      fetchTopSelling()
      fetchSalesWeekly()
      fetchProfitAmount()
    }
  }, [isFocused]);
  
  return (
    <CommonLayout>
      <View style={{}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginVertical:5}}>
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Dashboard</Text>
      {/* <Text style={{fontWeight:"bold", fontSize:8, borderWidth:2, padding:7, borderColor:"#ECEDF3", borderRadius:20, margin: "auto", textAlign: 'center'}}>{getCurrentDate()}</Text> */}
      </View>

      <View style={{flexDirection:"row", gap:10, marginHorizontal:"auto", justifyContent: 'center', alignItems: 'center'}}>
      <View style={{backgroundColor:"blue", width:150, height:80, justifyContent: 'flex-end', borderRadius:10, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3,  shadowRadius: 4,  elevation: 4}}>
        <View style={{ marginLeft:10, marginBottom:10}}>
        <Text style={{fontWeight: "bold", color: "white", fontSize: 10}}>Sales January 2024</Text>
        <Text style={{fontWeight: "bold", color: "white", fontSize: 10}}>Rp. {parseInt(totalIncome).toLocaleString()}</Text>
        </View>
      </View>
      <View style={{backgroundColor:"ffffff", borderWidth:0.5, justifyContent: 'flex-end',  width:150, height:80, borderRadius:10, borderColor:'#D2D2D2'}}>
      <View style={{marginLeft:10, marginBottom:10}}>
        <Text style={{fontWeight: "bold", color: "black", fontSize: 10}}>Today's Sales</Text>
        <Text style={{fontWeight: "bold", color: "black", fontSize: 10}}>Rp {parseInt(todayIncome).toLocaleString()}</Text>
        </View>
      </View>
      <View style={{backgroundColor:"ffffff", borderWidth:0.5, justifyContent: 'flex-end',  width:150, height:80, borderRadius:10, borderColor:'#D2D2D2'}}>
      <View style={{ marginLeft:10, marginBottom:10}}>
        <View style={{flexDirection:"row"}}>
        {/* <Ionicons name="arrow-up" size={24} color="white"  /> */}
        <Text style={{fontWeight: "bold", color: "green", fontSize: 10, marginLeft:10}}>{profitAmount?.profitPercentage}%</Text>
        </View>
        <Text style={{fontWeight: "bold", color: "black", fontSize: 10}}>Over Last Week</Text>
        </View>
      </View>
      </View>

      <View style={{flexDirection:"row", gap:10, marginHorizontal:"auto", marginVertical:10, justifyContent: 'center', alignItems:'center'}}>
      <View style={{ width:180, height:170, borderRadius:10, borderWidth:0.5, borderColor:'#D2D2D2'}}>
      <Text style={{fontWeight: "bold", color: "black", fontSize: 13, marginVertical:10, marginLeft:20}}>Top Selling Product</Text>
      <ScrollView>
          {topSelling?.map((x, index) => (
              <View key={index} style={{flexDirection: 'row', marginLeft:20, marginTop:20, gap:20}}>
                <View>
                <Image
                source={x.imgUrl !== '' ? { uri: x.imgUrl } : require('../../assets/img/no-image.png')}
                style={{width: 50, height: 50, resizeMode: 'cover', }}
                  />
                </View>
                <View>
                  <Text style={{fontWeight: "bold", color: "black", fontSize: 12}}>{x.productName}</Text>
                  <Text style={{ color: "black", fontSize: 10}}>Total: {x.totalQty}</Text>
                </View>
              </View>
          ))}



        </ScrollView>

      </View>
      <View style={{backgroundColor:"ffffff", borderWidth:0.5, borderColor:"#D2D2D2", width:280, height:170, borderRadius:10}}>
        <SalesChart/>
      </View>
      </View>

      </View>

      
    </CommonLayout>
  )
}

export default Home