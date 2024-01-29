import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';


interface Props {
    width: string;
    heigth: string;
    color?: string;
}
const PencilSVG = ({width, heigth, color}:Props) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={heigth} viewBox="0 0 23 22" fill={color}>
        <Path
          d="M22.6394 5.21559C23.1201 4.76066 23.1201 4.00243 22.6394 3.57082L19.755 0.841203C19.2989 0.386266 18.4977 0.386266 18.017 0.841203L15.7489 2.97591L20.3713 7.3503M0.809326 17.1256V21.5H5.43173L19.0647 8.58679L14.4423 4.2124L0.809326 17.1256Z"
          fill="#828282"
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

export default PencilSVG;
