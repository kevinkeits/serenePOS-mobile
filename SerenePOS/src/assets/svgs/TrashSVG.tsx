import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';


interface Props {
    width: string;
    height: string;
    color?: string;
}
const TrashSVG = ({width, height, color}:Props) => {
  return (
    <View style={styles.container}>
   <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
        <Path
          d="M6.255 20.283L4.5 8H20.5L18.745 20.283C18.6769 20.7596 18.4391 21.1956 18.0754 21.511C17.7117 21.8264 17.2464 22 16.765 22H8.235C7.75358 22 7.2883 21.8264 6.92458 21.511C6.56086 21.1956 6.32312 20.7596 6.255 20.283ZM21.5 4H16.5V3C16.5 2.73478 16.3946 2.48043 16.2071 2.29289C16.0196 2.10536 15.7652 2 15.5 2H9.5C9.23478 2 8.98043 2.10536 8.79289 2.29289C8.60536 2.48043 8.5 2.73478 8.5 3V4H3.5C3.23478 4 2.98043 4.10536 2.79289 4.29289C2.60536 4.48043 2.5 4.73478 2.5 5C2.5 5.26522 2.60536 5.51957 2.79289 5.70711C2.98043 5.89464 3.23478 6 3.5 6H21.5C21.7652 6 22.0196 5.89464 22.2071 5.70711C22.3946 5.51957 22.5 5.26522 22.5 5C22.5 4.73478 22.3946 4.48043 22.2071 4.29289C22.0196 4.10536 21.7652 4 21.5 4Z"
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

export default TrashSVG;
