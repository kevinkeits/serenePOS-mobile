import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';


interface Props {
    width: string;
    heigth: string;
    color?: string;
}
const ProductSVG = ({width, heigth, color}:Props) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={heigth} viewBox="0 0 24 24" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 4.6C0 3.91044 0.273928 3.24912 0.761522 2.76152C1.24912 2.27393 1.91044 2 2.6 2H21.4C22.0896 2 22.7509 2.27393 23.2385 2.76152C23.7261 3.24912 24 3.91044 24 4.6V5.4C24 6.08956 23.7261 6.75088 23.2385 7.23848C22.7509 7.72607 22.0896 8 21.4 8H21V18.6C21 19.93 19.93 21 18.6 21H5.4C4.07 21 3 19.93 3 18.6V8H2.6C1.91044 8 1.24912 7.72607 0.761522 7.23848C0.273928 6.75088 0 6.08956 0 5.4L0 4.6ZM2.6 4C2.44087 4 2.28826 4.06321 2.17574 4.17574C2.06321 4.28826 2 4.44087 2 4.6V5.4C2 5.55913 2.06321 5.71174 2.17574 5.82426C2.28826 5.93679 2.44087 6 2.6 6H21.4C21.5591 6 21.7117 5.93679 21.8243 5.82426C21.9368 5.71174 22 5.55913 22 5.4V4.6C22 4.44087 21.9368 4.28826 21.8243 4.17574C21.7117 4.06321 21.5591 4 21.4 4H2.6ZM8 10C7.73478 10 7.48043 10.1054 7.29289 10.2929C7.10536 10.4804 7 10.7348 7 11C7 11.2652 7.10536 11.5196 7.29289 11.7071C7.48043 11.8946 7.73478 12 8 12H16C16.2652 12 16.5196 11.8946 16.7071 11.7071C16.8946 11.5196 17 11.2652 17 11C17 10.7348 16.8946 10.4804 16.7071 10.2929C16.5196 10.1054 16.2652 10 16 10H8Z"
          fill={color}
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

export default ProductSVG;
