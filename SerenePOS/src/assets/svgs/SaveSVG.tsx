import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';


interface Props {
    width: string;
    height: string;
    color?: string;
}
const SaveSVG = ({width, height, color}:Props) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 40 40" fill="none">
        <Path
          d="M24.9998 33.3333V25H14.9998V33.3333M29.9998 33.3333H9.99984C8.15889 33.3333 6.6665 31.841 6.6665 30V9.99999C6.6665 8.15904 8.15889 6.66666 9.99984 6.66666H23.6192C24.5032 6.66666 25.351 7.01784 25.9762 7.64297L32.3568 14.0237C32.982 14.6488 33.3332 15.4966 33.3332 16.3807V30C33.3332 31.841 31.8408 33.3333 29.9998 33.3333Z"
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

export default SaveSVG;
