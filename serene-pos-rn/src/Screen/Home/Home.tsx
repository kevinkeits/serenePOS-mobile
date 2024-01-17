import React from 'react'
import { Button, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useNavigation } from '@react-navigation/native';
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import SalesChart from './components/SalesChart/SalesChart';



const Home = () => {
  const [selectedFilter, setSelectedFilter] = React.useState<'weekly' | 'monthly'>('weekly');

  const data = {
    weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [50, 75, 60, 90, 80, 110, 95],
        },
      ],
    },
    monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          data: [150, 120, 200, 180],
        },
      ],
    },
  };

  const chartData = data[selectedFilter];

  // Manually append suffix to y-axis labels
  const labelsWithSuffix = chartData.labels.map((label) => `${label}$`);



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
      <View style={{backgroundColor:"blue", width:420, height:300, justifyContent: 'flex-end', borderRadius:15, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3,  shadowRadius: 4,  elevation: 4}}>
        <View style={{marginBottom:40, marginLeft: 60, gap: 10}}>
        <Text style={{fontWeight: "bold", color: "white", fontSize: 18}}>Sales January 2024</Text>
        <Text style={{fontWeight: "bold", color: "white", fontSize: 23}}>Rp. 5,257,000</Text>
        </View>
      </View>
      <View style={{backgroundColor:"ffffff", borderWidth:2, justifyContent: 'flex-end', borderColor:"blue", width:420, height:300, borderRadius:15, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3,  shadowRadius: 4,  elevation: 4}}>
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
      </View>
      </View>

      {/* <View style={{flexDirection:"row", gap:20, marginHorizontal:"auto", marginTop:40}}>
      <TouchableOpacity style={{ width:450, height:150}}>
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
      </View> */}

      <View style={{flexDirection:"row", gap:20, marginHorizontal:"auto", marginVertical:30}}>
      <View style={{ width:450, height:300, borderRadius:15, borderWidth:2, borderColor:'#D2D2D2'}}>
      <Text style={{fontWeight: "bold", color: "black", fontSize: 23, marginVertical:10, marginLeft:20}}>Top Selling Product</Text>
      <ScrollView>
        <View style={{flexDirection: 'row', marginLeft:20, marginTop:20, gap:20}}>
        <View>
         <Image
        source={require('../../assets/img/KopiTubruk 1.png')}
        style={{width: 50, height: 50, resizeMode: 'cover', }}
           />
         </View>
         <View>
          <Text style={{fontWeight: "bold", color: "black", fontSize: 23}}>Americano</Text>
          <Text style={{ color: "black", fontSize: 18}}>Total: 150</Text>
         </View>
        </View>

        <View style={{flexDirection: 'row', marginLeft:20, marginTop:20, gap:20}}>
        <View>
         <Image
        source={require('../../assets/img/KopiTubruk 1.png')}
        style={{width: 50, height: 50, resizeMode: 'cover', }}
           />
         </View>
         <View>
          <Text style={{fontWeight: "bold", color: "black", fontSize: 23}}>Americano</Text>
          <Text style={{ color: "black", fontSize: 18}}>Total: 150</Text>
         </View>
        </View>

        <View style={{flexDirection: 'row', marginLeft:20, marginTop:20, gap:20}}>
        <View>
         <Image
        source={require('../../assets/img/KopiTubruk 1.png')}
        style={{width: 50, height: 50, resizeMode: 'cover', }}
           />
         </View>
         <View>
          <Text style={{fontWeight: "bold", color: "black", fontSize: 23}}>Americano</Text>
          <Text style={{ color: "black", fontSize: 18}}>Total: 150</Text>
         </View>
        </View>


        <View style={{flexDirection: 'row', marginLeft:20, marginTop:20, gap:20}}>
        <View>
         <Image
        source={require('../../assets/img/KopiTubruk 1.png')}
        style={{width: 50, height: 50, resizeMode: 'cover', }}
           />
         </View>
         <View>
          <Text style={{fontWeight: "bold", color: "black", fontSize: 23}}>Americano</Text>
          <Text style={{ color: "black", fontSize: 18}}>Total: 150</Text>
         </View>
        </View>


        <View style={{flexDirection: 'row', marginLeft:20, marginTop:20, gap:20}}>
        <View>
         <Image
        source={require('../../assets/img/KopiTubruk 1.png')}
        style={{width: 50, height: 50, resizeMode: 'cover', }}
           />
         </View>
         <View>
          <Text style={{fontWeight: "bold", color: "black", fontSize: 23}}>Americano</Text>
          <Text style={{ color: "black", fontSize: 18}}>Total: 150</Text>
         </View>
        </View>

        </ScrollView>

      </View>
      <View style={{backgroundColor:"ffffff", borderWidth:2, borderColor:"#D2D2D2", width:800, height:300, borderRadius:15}}>
      <SalesChart/>
      </View>
      </View>

    </View>
    </CommonLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  dropdownContainer: {
    marginTop: 20,
    width: 200,
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownList: {
    backgroundColor: '#fafafa',
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 20,
  },
  picker: {
    height: 40,
    width: 150,
  },
});

export default Home
