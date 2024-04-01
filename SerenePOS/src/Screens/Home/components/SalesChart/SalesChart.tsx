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
      labels: ['','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [0,50, 75, 60, 90, 80, 110, 95],
    },
    monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      values: [150, 120, 200, 180],
    },
  };

  const chartData = data[selectedFilter];
  
  // Calculate dimensions
  const width = 200; // Adjust the width as needed
  const height = 120; // Adjust the height as needed
  const margin = { top: 20, right: 20, bottom: 20, left: 20 }; // Adjust the margin as needed

  const minDataValue = Math.min(...chartData.values); // Calculate the minimum value in data

  const x = (i: number) => i * ((width - margin.left - margin.right) / chartData.labels.length) + margin.left;
  const y = (value: number) => height - ((value - minDataValue) * (height - margin.top - margin.bottom)) / (Math.max(...chartData.values) - minDataValue) - margin.bottom;

  const barWidth = (width - margin.left - margin.right) / chartData.labels.length - 4; // Adjust the width of bars and the gap between them

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.title}>Sales History</Text>
        <RNPickerSelect
          onValueChange={(x) => setSelectedFilter(x as 'weekly' | 'monthly')}
          items={[
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
          ]}
          useNativeAndroidPickerStyle={false}
          value={selectedFilter}
          Icon={() => <DropdownSVG width='9' height='9' color='black' />}
          style={pickerSelectStyles}
        />
      </View>
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
              y={height - 5} // Adjust the vertical positioning of x-axis labels
              fill="black"
              fontSize="8" // Adjust the font size as needed
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
              fontSize="8" // Adjust the font size as needed
              textAnchor="end"
            >
              {value}
            </SvgText>
          ))}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5, // Adjust the margin as needed
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
    marginRight: 10,
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
    paddingTop: 5,
    borderBottomWidth: 0.5,
    borderColor: '#D2D2D2',
    borderRadius: 6,
    color: 'black',
    paddingRight: 5 // to ensure the text is never behind the icon
  },
});

export default SalesChart;
