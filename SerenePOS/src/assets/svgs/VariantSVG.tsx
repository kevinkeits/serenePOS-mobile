import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  width: string;
  height: string;
  color?: string;
}

const VariantSVG = ({ width, height, color }: Props) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 20 16" fill="none">
        <Path
          d="M6 2.00067L19 2.00139M6 8.0007L19 8.0015M6 14.0007L19 14.0015M1.5 2H1.51M1.5 8H1.51M1.5 14H1.51M2 2C2 2.27614 1.77614 2.5 1.5 2.5C1.22386 2.5 1 2.27614 1 2C1 1.72386 1.22386 1.5 1.5 1.5C1.77614 1.5 2 1.72386 2 2ZM2 8C2 8.2761 1.77614 8.5 1.5 8.5C1.22386 8.5 1 8.2761 1 8C1 7.7239 1.22386 7.5 1.5 7.5C1.77614 7.5 2 7.7239 2 8ZM2 14C2 14.2761 1.77614 14.5 1.5 14.5C1.22386 14.5 1 14.2761 1 14C1 13.7239 1.22386 13.5 1.5 13.5C1.77614 13.5 2 13.7239 2 14Z"
          stroke={color}
          strokeWidth={1}
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

export default VariantSVG;
