import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useNavigation } from '@react-navigation/native';
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Home = () => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return currentDate.toLocaleDateString(undefined, options);
  };
  const navigation = useNavigation();
  return (
    <CommonLayout>
      <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginVertical:20}}>
      <Text style={{fontWeight:"bold", fontSize:25, marginVertical: "auto"}}>Dashboard</Text>
      <Text style={{fontWeight:"bold", fontSize:17, borderWidth:2, padding:10, borderColor:"#ECEDF3", borderRadius:20}}>{getCurrentDate()}</Text>
      </View>
      <View style={{flexDirection:"row", gap:20, marginHorizontal:"auto"}}>
      <View style={{backgroundColor:"blue", width:400, height:150, justifyContent: 'flex-end', borderRadius:15, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3,  shadowRadius: 4,  elevation: 4}}>
        <View style={{marginBottom:40, marginLeft: 60, gap: 10}}>
        <Text style={{fontWeight: "bold", color: "white", fontSize: 18}}>Sales January 2024</Text>
        <Text style={{fontWeight: "bold", color: "white", fontSize: 23}}>Rp. 5,257,000</Text>
        </View>
      </View>
      <View style={{backgroundColor:"ffffff", borderWidth:2, justifyContent: 'flex-end', borderColor:"blue", width:400, height:150, borderRadius:15, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3,  shadowRadius: 4,  elevation: 4}}>
      <View style={{marginBottom:40, marginLeft: 60, gap: 10}}>
        <Text style={{fontWeight: "bold", color: "blue", fontSize: 18}}>Today's Sales</Text>
        <Text style={{fontWeight: "bold", color: "blue", fontSize: 23}}>Rp. 85,000</Text>
        </View>
      </View>
      <View style={{backgroundColor:"green", width:400, height:150, borderRadius:15, justifyContent: 'flex-end',  shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3,  shadowRadius: 4,  elevation: 4}}>
      <View style={{marginBottom:40, marginLeft: 60, gap: 10}}>
        <View style={{flexDirection:"row"}}>
        <Ionicons name="arrow-up" size={24} color="white"  />
        <Text style={{fontWeight: "bold", color: "white", fontSize: 23, marginLeft:10}}>+ 10%</Text>
        </View>
        <Text style={{fontWeight: "bold", color: "white", fontSize: 18}}>Over Last Week</Text>
        </View>
      </View>
      </View>

      <View style={{flexDirection:"row", gap:20, marginHorizontal:"auto", marginTop:40}}>
      <TouchableOpacity style={{ width:400, height:150}}>
        <View style={{marginBottom:40, gap: 10, marginHorizontal: "auto"}}>
        <Ionicons name="cog" size={100} color="black" style={{margin: "auto"}}  />
        <Text style={{fontWeight: "bold", color: "black", fontSize: 23, margin: "auto"}}>Settings</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width:400, height:150}}>
        <View style={{marginBottom:40, gap: 10, marginHorizontal: "auto"}}>
        <Ionicons name="alert" size={100} color="black" style={{margin: "auto"}}  />
        <Text style={{fontWeight: "bold", color: "black", fontSize: 23, margin: "auto"}}>Report</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width:400, height:150}}>
        <View style={{marginBottom:40, gap: 10, marginHorizontal: "auto"}}>
        <Ionicons name="help-circle-outline" size={100} color="black" style={{margin: "auto"}}  />
        <Text style={{fontWeight: "bold", color: "black", fontSize: 23, margin: "auto"}}>Help and Support</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
    </CommonLayout>
  )
}

export default Home
