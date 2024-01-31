import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';


interface Props {
    width: string;
    height: string;
    color?: string;
}
const TransactionHistorySVG = ({width, height, color}:Props) => {
  return (
    <View style={styles.container}>
    <Svg
      width={width}
      height={height}
      viewBox="0 0 22 24"
      fill="none"
    >
      <G clipPath="url(#clip0_497_291)">
        <Path d="M16.6153 19.2003V22.5233C16.6153 22.9295 16.283 23.2618 15.8768 23.2618H1.1076C0.701448 23.2618 0.369141 22.9295 0.369141 22.5233V3.69256C0.369141 3.28641 0.701448 2.9541 1.1076 2.9541H5.16914" stroke={color} strokeLinejoin="round" />
        <Path d="M11.8154 2.9541H15.877C16.2831 2.9541 16.6154 3.28641 16.6154 3.69256V14.7695" stroke={color} strokeLinejoin="round" />
        <Path d="M11.0764 21.046H2.95331C2.54715 21.046 2.21484 20.7137 2.21484 20.3075V5.53827C2.21484 5.13211 2.54715 4.7998 2.95331 4.7998H5.16869" stroke={color} strokeLinejoin="round" />
        <Path d="M11.8154 4.7998H14.0308C14.437 4.7998 14.7693 5.13211 14.7693 5.53827V16.6152" stroke={color} strokeLinejoin="round" />
        <Path d="M11.0766 2.21529C11.0766 2.21529 9.96895 1.95683 9.96895 1.84606C9.96895 1.03376 9.30433 0.369141 8.49202 0.369141C7.67971 0.369141 7.0151 1.03376 7.0151 1.84606C7.0151 1.95683 5.90741 2.21529 5.90741 2.21529C5.50125 2.21529 5.16895 2.5476 5.16895 2.95376V4.79991C5.16895 5.20606 5.50125 5.53837 5.90741 5.53837H11.0766C11.4828 5.53837 11.8151 5.20606 11.8151 4.79991V2.95376C11.8151 2.5476 11.4828 2.21529 11.0766 2.21529Z" stroke={color} strokeLinejoin="round" />
        <Path d="M4.06152 8.49219H11.8154" stroke={color} strokeLinejoin="round" />
        <Path d="M4.06152 10.708H8.49229" stroke={color} strokeLinejoin="round" />
        <Path d="M4.06152 12.5537H12.5538" stroke={color} strokeLinejoin="round" />
        <Path d="M4.06152 15.1387H10.3384" stroke={color}strokeLinejoin="round" />
        <Path d="M8.86133 18.0918H12.5536" stroke={color} strokeLinejoin="round" />
        <Path d="M13.661 21.9692L10.3379 23.2615L11.6302 19.9384L11.7779 19.7907L19.2733 12.2953C19.421 12.1476 19.6794 12.1476 19.864 12.2953L21.304 13.7353C21.4517 13.883 21.4517 14.1415 21.304 14.3261L13.8087 21.8215L13.661 21.9692Z" stroke={color} strokeLinejoin="round" />
        <Path d="M18.4238 13.1816L20.4177 15.1755" stroke={color} strokeLinejoin="round" />
      </G>
      <Defs>
        <ClipPath id="clip0_497_291">
          <Rect width="21.7846" height="24" fill={color} />
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

export default TransactionHistorySVG;
