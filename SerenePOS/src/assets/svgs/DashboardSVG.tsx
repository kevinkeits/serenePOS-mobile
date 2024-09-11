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
      <Svg viewBox="0 0 34 24" width={width} height={height} fill="none">
        <Path
          d="M22 11C24.2091 11 26 9.20914 26 7C26 4.79086 24.2091 3 22 3C19.7909 3 18 4.79086 18 7C18 9.20914 19.7909 11 22 11Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M30 21V19C30 17.9391 29.5786 16.9217 28.8284 16.1716C28.0783 15.4214 27.0609 15 26 15H18C16.9391 15 15.9217 15.4214 15.1716 16.1716C14.4214 16.9217 14 17.9391 14 19V21"
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
