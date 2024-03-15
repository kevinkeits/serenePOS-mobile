import React from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'
import Sidebar from '../../Components/Sidebar/Sidebar'
import SalesChart from './components/SalesChart/SalesChart'

const Home = () => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return currentDate.toLocaleDateString(undefined, options);
  };
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
        <Text style={{fontWeight: "bold", color: "white", fontSize: 10}}>Rp. 5,257,000</Text>
        </View>
      </View>
      <View style={{backgroundColor:"ffffff", borderWidth:0.5, justifyContent: 'flex-end',  width:150, height:80, borderRadius:10, borderColor:'#D2D2D2'}}>
      <View style={{marginLeft:10, marginBottom:10}}>
        <Text style={{fontWeight: "bold", color: "black", fontSize: 10}}>Today's Sales</Text>
        <Text style={{fontWeight: "bold", color: "black", fontSize: 10}}>Rp. 85,000</Text>
        </View>
      </View>
      <View style={{backgroundColor:"ffffff", borderWidth:0.5, justifyContent: 'flex-end',  width:150, height:80, borderRadius:10, borderColor:'#D2D2D2'}}>
      <View style={{ marginLeft:10, marginBottom:10}}>
        <View style={{flexDirection:"row"}}>
        {/* <Ionicons name="arrow-up" size={24} color="white"  /> */}
        <Text style={{fontWeight: "bold", color: "green", fontSize: 10, marginLeft:10}}>+ 10%</Text>
        </View>
        <Text style={{fontWeight: "bold", color: "black", fontSize: 10}}>Over Last Week</Text>
        </View>
      </View>
      </View>

      <View style={{flexDirection:"row", gap:10, marginHorizontal:"auto", marginVertical:10, justifyContent: 'center', alignItems:'center'}}>
      <View style={{ width:180, height:170, borderRadius:10, borderWidth:0.5, borderColor:'#D2D2D2'}}>
      <Text style={{fontWeight: "bold", color: "black", fontSize: 13, marginVertical:10, marginLeft:20}}>Top Selling Product</Text>
      <ScrollView>
        <View style={{flexDirection: 'row', marginLeft:20, marginTop:20, gap:20}}>
        <View>
         <Image
        source={require('../../assets/img/KopiTubruk1.png')}
        style={{width: 50, height: 50, resizeMode: 'cover', }}
           />
         </View>
         <View>
          <Text style={{fontWeight: "bold", color: "black", fontSize: 12}}>Americano</Text>
          <Text style={{ color: "black", fontSize: 10}}>Total: 150</Text>
         </View>
        </View>

        <View style={{flexDirection: 'row', marginLeft:20, marginTop:20, gap:20}}>
        <View>
         <Image
        source={require('../../assets/img/KopiTubruk1.png')}
        style={{width: 50, height: 50, resizeMode: 'cover', }}
           />
         </View>
         <View>
          <Text style={{fontWeight: "bold", color: "black", fontSize: 12}}>Americano</Text>
          <Text style={{ color: "black", fontSize: 10}}>Total: 150</Text>
         </View>
        </View>

        <View style={{flexDirection: 'row', marginLeft:20, marginTop:20, gap:20}}>
        <View>
         <Image
        source={require('../../assets/img/KopiTubruk1.png')}
        style={{width: 50, height: 50, resizeMode: 'cover', }}
           />
         </View>
         <View>
          <Text style={{fontWeight: "bold", color: "black", fontSize: 12}}>Americano</Text>
          <Text style={{ color: "black", fontSize: 10}}>Total: 150</Text>
         </View>
        </View>
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