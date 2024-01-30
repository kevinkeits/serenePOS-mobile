import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { G, Path, Rect, Defs, ClipPath } from 'react-native-svg';

interface Props {
  width: string;
  height: string;
  color?: string;
}

const CategoriesSVG = ({ width, height, color }: Props) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <G clipPath="url(#clip0_442_418)">
          <Rect width="24" height="24" fill="none" />
          <Path d="M21 18.75H10.5V20.25H21V18.75Z" fill={color} />
          <Path
            d="M5.37707 19.5L3.44207 21.435L4.49957 22.5L7.49957 19.5L4.49957 16.5L3.43457 17.5575L5.37707 19.5Z"
            fill={color}
          />
          <Path d="M21 11.25H10.5V12.75H21V11.25Z" fill={color} />
          <Path
            d="M5.37707 12L3.44207 13.935L4.49957 15L7.49957 12L4.49957 9L3.43457 10.0575L5.37707 12Z"
            fill={color}
          />
          <Path d="M21 3.75H10.5V5.25H21V3.75Z" fill={color} />
          <Path
            d="M5.37707 4.5L3.44207 6.435L4.49957 7.5L7.49957 4.5L4.49957 1.5L3.43457 2.5575L5.37707 4.5Z"
            fill={color}
          />
        </G>
        <Defs>
          <ClipPath id="clip0_442_418">
            <Rect width="24" height="24" fill="white" />
          </ClipPath>
        </Defs>
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

export default CategoriesSVG;
