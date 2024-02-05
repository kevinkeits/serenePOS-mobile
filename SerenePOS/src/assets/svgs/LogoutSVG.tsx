import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';


interface Props {
    width: string;
    height: string;
    color?: string;
}
const LogoutSVG = ({width, height, color}:Props) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
        <Path
          d="M19 21V23.5C19 24.163 18.7366 24.7989 18.2678 25.2678C17.7989 25.7366 17.163 26 16.5 26H6.5C5.83696 26 5.20107 25.7366 4.73223 25.2678C4.26339 24.7989 4 24.163 4 23.5V8.5C4 7.83696 4.26339 7.20107 4.73223 6.73223C5.20107 6.26339 5.83696 6 6.5 6H16C17.3806 6 19 7.11937 19 8.5V11"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M23 21L28 16L23 11"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11 16H27"
          stroke={color}
          strokeWidth="1"
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

export default LogoutSVG;
