import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import RNPickerSelect from "react-native-picker-select";
import DropdownSVG from '../../../../assets/svgs/DropdownSVG';


const SalesChart: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'weekly' | 'monthly'>('weekly');

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
  

  return (
    <View style={styles.container}>
      {/* <Text style={styles.chartTitle}>
        {selectedFilter === 'weekly' ? 'Weekly' : 'Monthly'} Sales Chart
      </Text> */}
      <View style={styles.pickerContainer}>
      <Text style={{fontWeight: "bold", color: "black", fontSize: 12, marginVertical:'auto', marginLeft:20}}>Sales History</Text>

        <View style={{
            justifyContent: 'center',
            height:25,
            width:100,
            }}>

            <RNPickerSelect
                onValueChange={(x) => setSelectedFilter(x as 'weekly' | 'monthly')}
                items={[
                    { label: "Weekly", value: "weekly" },
                    { label: "Monthly", value: "monthly" },
                ]}
                useNativeAndroidPickerStyle={false}
                value={selectedFilter}
                Icon={() => {
                  return <View style={{marginTop:2}}><DropdownSVG width='9' height='9' color='black' /></View>;
                }}
             style={pickerSelectStyles}
            
            />


            </View>  
      </View>
      <LineChart
        data={{
          labels: chartData.labels,
          datasets: [{ data: chartData.datasets[0].data }],
        }}
        width={200}
        height={100}
        yAxisSuffix=" "
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
   flexDirection:'row',
   alignItems:'center',
   gap:80,
   marginTop:10,
   marginBottom:8
  },
  picker: {
    height: 40,
    width: 100,
    fontSize: 10
    
  },
  pickerItem: {
    fontSize: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignItems:'center',
    justifyContent: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 0.5,
      borderColor: '#D2D2D2',
      borderRadius: 6,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 8,
      // paddingHorizontal: 10,
       paddingTop: 5,
      borderBottomWidth: 0.5,
      borderColor: '#D2D2D2',
      borderRadius: 6,
      color: 'black',
      paddingRight: 5 // to ensure the text is never behind the icon
  },
  iconContainer: {
      top: 5,
      right: 15,
    },
    
});

export default SalesChart;