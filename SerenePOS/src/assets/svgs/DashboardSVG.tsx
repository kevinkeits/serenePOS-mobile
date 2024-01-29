import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';


interface Props {
    width: string;
    heigth: string;
    color?: string;
}
const DashboardSVG = ({width, heigth, color}:Props) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={heigth} viewBox="0 0 24 24" fill="none">
        <Path
          d="M17 7V5C17 3.93913 16.5786 2.92172 15.8284 2.17157C15.0783 1.42143 14.0609 1 13 1H5C3.93913 1 2.92172 1.42143 2.17157 2.17157C1.42143 2.92172 1 3.93913 1 5V7"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DashboardSVG;
