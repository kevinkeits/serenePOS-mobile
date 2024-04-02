import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import moment from 'moment'
import React from 'react'
import { Text, View, Image, ScrollView, Dimensions } from 'react-native'
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


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');


const Home = () => {

  const isFocused = useIsFocused();
  const [dimensions, setDimensions] = React.useState({
    window: windowDimensions,
    screen: screenDimensions,
  });


  const [todayIncome, setTodayIncome] = React.useState<string>('');
  const [totalIncome, setTotalIncome] = React.useState<string>('');
  const [topSelling, setTopSelling] = React.useState<ITopSelling[]>([]);
  const [salesWeekly, setSalesWeekly] = React.useState<ISalesWeekly[]>([]);
  const [profitAmount, setProfitAmount] = React.useState<IProfitAmount | null>(null);


  const currentMonthAndYear = moment().format('MMMM YYYY');

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
        console.log(data)
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
      <View style={{width:'100%'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginVertical:5}}>
      <Text style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Dashboard</Text>
      </View>

      <View style={{flexDirection:"row", gap:10, marginHorizontal:"auto", justifyContent: 'center', alignItems: 'center'}}>
      <View style={{backgroundColor:"blue", width:'31%', height:120, justifyContent: 'flex-end', borderRadius:10, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3,  shadowRadius: 4,  elevation: 4}}>
        <View style={{ marginLeft:10, marginBottom:10}}>
        <Text style={{fontWeight: "bold", color: "white"}}>Sales {currentMonthAndYear}</Text>
        <Text style={{fontWeight: "bold", color: "white"}}>Rp. {parseInt(totalIncome).toLocaleString()}</Text>
        </View>
      </View>
      <View style={{backgroundColor:"ffffff", borderWidth:0.5, justifyContent: 'flex-end',  width:'31%', height:120, borderRadius:10, borderColor:'#D2D2D2'}}>
      <View style={{marginLeft:10, marginBottom:10}}>
        <Text style={{fontWeight: "bold", color: "black",}}>Today's Sales</Text>
        <Text style={{fontWeight: "bold", color: "black",}}>Rp {parseInt(todayIncome).toLocaleString()}</Text>
        </View>
      </View>
      <View style={{backgroundColor:"ffffff", borderWidth:0.5, justifyContent: 'flex-end',  width:'31%', height:120, borderRadius:10, borderColor:'#D2D2D2'}}>
      <View style={{ marginLeft:10, marginBottom:10}}>
        <View style={{flexDirection:"row"}}>
        {/* <Ionicons name="arrow-up" size={24} color="white"  /> */}
        <Text style={{fontWeight: "bold", color: "green", marginLeft:10}}>{profitAmount?.profitPercentage}%</Text>
        </View>
        <Text style={{fontWeight: "bold", color: "black",}}>Over Last Week</Text>
        </View>
      </View>
      </View>

      <View style={{flexDirection:"row", gap:10, marginHorizontal:"auto", marginVertical:10, justifyContent: 'center', alignItems:'center'}}>
      <View style={{ width:'30%', height:400, borderRadius:10, borderWidth:0.5, borderColor:'#D2D2D2'}}>
      <Text style={{fontWeight: "bold", color: "black", marginTop:10, marginLeft:20}}>Top Selling Product</Text>
      <ScrollView>
          {topSelling?.map((x, index) => (
              <View key={index} style={{flexDirection: 'row', marginLeft:20, marginTop:13, gap:20}}>
                <View>
                <Image
                source={x.imgUrl !== '' ? { uri: x.imgUrl } : require('../../assets/img/no-image.png')}
                style={{width: 50, height: 50, resizeMode: 'cover', }}
                  />
                </View>
                <View>
                  <Text style={{fontWeight: "bold", color: "black"}}>{x.productName}</Text>
                  <Text style={{ color: "black"}}>Total: {x.totalQty}</Text>
                </View>
              </View>
          ))}



        </ScrollView>

      </View>
      <View style={{backgroundColor:"ffffff", borderWidth:0.5, borderColor:"#D2D2D2", width:'65%', height:400, borderRadius:10}}>
        <SalesChart salesWeekly={salesWeekly}/>
      </View>
      </View>

      </View>

      
    </CommonLayout>
  )
}

export default Home