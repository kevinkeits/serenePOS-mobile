import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';


interface Props {
    width: string;
    height: string;
    color?: string;
}
const DropdownSVG = ({width, height, color}:Props) => {
  return (
<View style={styles.container}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 16 9"
        fill="none"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.29289 0.29289C0.68342 -0.09763 1.31658 -0.09763 1.70711 0.29289L8 6.5858L14.2929 0.29289C14.6834 -0.09763 15.3166 -0.09763 15.7071 0.29289C16.0976 0.68342 16.0976 1.31658 15.7071 1.70711L8.7071 8.7071C8.3166 9.0976 7.6834 9.0976 7.2929 8.7071L0.29289 1.70711C-0.09763 1.31658 -0.09763 0.68342 0.29289 0.29289Z"
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

export default DropdownSVG;
