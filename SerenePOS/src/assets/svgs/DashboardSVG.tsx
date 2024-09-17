import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  width: string;
  height: string;
  color?: string;
}

const DashboardSVG = ({ width, height, color = 'white' }: Props) => {
  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 24 24" width={width} height={height} fill="none">
        {/* Adjust the round head to be more proportional and centered */}
        <Path
          d="M12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Adjusted the body and position */}
        <Path
          d="M20 20V18C20 16.6739 19.4732 15.4021 18.5355 14.4645C17.5979 13.5268 16.3261 13 15 13H9C7.67392 13 6.40215 13.5268 5.46447 14.4645C4.52678 15.4021 4 16.6739 4 18V20"
          stroke={color}
          strokeWidth={2}
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
