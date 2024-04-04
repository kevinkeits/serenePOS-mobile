import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { G, Rect, Svg, Text as SvgText, Line } from 'react-native-svg'; // Remove Circle import
import RNPickerSelect from "react-native-picker-select";
import DropdownSVG from '../../../../assets/svgs/DropdownSVG';
import { ISalesWeekly } from '../../Home';

const screenWidth = Dimensions.get("window").width;

interface ISalesChartProps {
  salesWeekly: ISalesWeekly[]
}

const SalesChart = ({salesWeekly}: ISalesChartProps) => {
  const [selectedFilter, setSelectedFilter] = useState<'weekly' | 'monthly'>('weekly');

  

  const data = {
    weekly: {
      labels: salesWeekly.map((x=>x.transactionDay)),
      values: salesWeekly.map((x=> parseInt(x.paymentAmount))),
    },
    monthly: {
      labels: [ 'Week 1', 'Week 2', 'Week 3', 'Week 4'],
      values: [ 150, 120, 200, 180],
    },
  };

  const chartData = data[selectedFilter];

  
  
  // Calculate dimensions
  const width = 400; // Adjust the width as needed
  const height = 200; // Adjust the height as needed
  const margin = { top: 13, right: 20, bottom: 20, left: 70 }; // Adjust the margin as needed

  const minDataValue = Math.min(...chartData.values); // Calculate the minimum value in data

  const x = (i: number) => i * ((width - margin.left - margin.right) / chartData.labels.length) + margin.left;
  const y = (value: number) => height - ((value - minDataValue) * (height - margin.top - margin.bottom)) / (Math.max(...chartData.values) - minDataValue) - margin.bottom;

  const barWidth = (width - margin.left - margin.right) / chartData.labels.length - 4; // Adjust the width of bars and the gap between them


  console.log(chartData, minDataValue, x(0), y(73795), barWidth)
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.title}>Sales History</Text>
        <RNPickerSelect
            onValueChange={(value) => setSelectedFilter(value)}
            items={[
              { label: "Weekly", value: "weekly" },
              { label: "Monthly", value: "monthly" },
            ]}
            useNativeAndroidPickerStyle={false}
            value={selectedFilter}
            Icon={() => <DropdownSVG width='9' height='9' color='black' />}
            style={{
              ...pickerSelectStyles,
              iconContainer: pickerSelectStyles.iconContainer,
              placeholder: { color: 'gray' }, // Optional: if you have a placeholder
            }}
          />
      </View>
      <View style={{justifyContent:'center', alignSelf:'center', marginTop:10}}>
      <Svg width={width} height={height}>
        <G>
          {/* Add horizontal line with dotted style */}
          {chartData.values.map((value, i) => (
            <Line
              key={`line_${i}`}
              x1={margin.left}
              y1={y(value)}
              x2={x(chartData.labels.length - 1) + barWidth}
              y2={y(value)}
              stroke="gray"
              strokeWidth={0.5}
              strokeDasharray="2,2" // Define the dotted style
            />
          ))}
          {/* Add bars */}
          {chartData.values.map((value, i) => (
            <Rect
              key={`bar_${i}`}
              x={x(i)}
              y={y(value)}
              width={barWidth}
              height={height - margin.bottom - y(value)}
              fill="blue"
            />
          ))}
          {/* Add x-axis labels */}
          {chartData.labels.map((label, i) => (
            <SvgText
              key={`xLabel_${i}`}
              x={x(i) + barWidth / 2}
              y={height - 5} 
              fill="black"
              // fontSize="8" 
              textAnchor="middle"
            >
              {label}
            </SvgText>
          ))}
          {/* Add y-axis labels */}
          {chartData.values.map((value, i) => (
            <SvgText
              key={`yLabel_${i}`}
              x={margin.left - 5}
              y={y(value)}
              fill="black"
              // fontSize="8" 
              textAnchor="end"
            >
              {value}
            </SvgText>
          ))}
        </G>
      </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginHorizontal:20,
    marginTop:10
    // padding:3
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    // fontSize: 12,
    marginRight: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // fontSize: 8,
    height:20,
    width:'40%',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    // fontSize: 8,
    height:40,
    paddingLeft: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: '70%',
    right: 15,
    transform: [{ translateY: -10 }], // Adjust based on your icon's size
  },
});

export default SalesChart;
