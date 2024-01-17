import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';

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
      <Text style={{fontWeight: "bold", color: "black", fontSize: 23, marginVertical:'auto', marginLeft:20}}>Sales History</Text>
        <Picker
          selectedValue={selectedFilter}
          onValueChange={(itemValue) => setSelectedFilter(itemValue as 'weekly' | 'monthly')}
          style={styles.picker}
        >
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Monthly" value="monthly" />
        </Picker>
      </View>
      <LineChart
        data={{
          labels: chartData.labels,
          datasets: [{ data: chartData.datasets[0].data }],
        }}
        width={700}
        height={200}
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
    borderColor: '#ddd',
    marginRight:20,
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom:10,
    overflow: 'hidden',
    
    justifyContent: 'space-between',
    marginTop: 20,
  },
  picker: {
    height: 40,
    width: 150,
    
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignItems:'center',
    justifyContent: 'center',
  },
});

export default SalesChart;
