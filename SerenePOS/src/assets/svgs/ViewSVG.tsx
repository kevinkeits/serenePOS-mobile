import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';


interface Props {
    width: string;
    height: string;
    color?: string;
}
const ViewSVG = ({width, height, color}:Props) => {
  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 28 16" width={width} height={height} fill="none">
        <Path
          d="M2.72623 9.75619C2.4814 10.454 1.6896 10.831 0.957008 10.5983C0.223996 10.3654 -0.172167 9.61029 0.0721726 8.91171C0.0466821 8.99293 0.073208 8.90875 0.073208 8.90875C0.0886813 8.86501 0.10519 8.82163 0.12209 8.77837C0.150883 8.70464 0.192266 8.60277 0.24736 8.47677C0.357409 8.22501 0.522775 7.87557 0.752357 7.46099C1.21029 6.63408 1.93138 5.53435 2.99129 4.43237C5.13269 2.20603 8.63705 0 13.9908 0C19.3444 0 22.8488 2.20603 24.9902 4.43237C26.0502 5.53435 26.7713 6.63408 27.229 7.46099C27.4588 7.87557 27.6241 8.22501 27.7341 8.47677C27.7892 8.60277 27.8306 8.70464 27.8594 8.77837C27.8681 8.8004 27.8969 8.93992 27.9246 9.07395C27.9498 9.19581 27.9742 9.31312 27.9814 9.33333C27.9814 9.33333 28.2151 10.2201 27.0245 10.5983C26.2931 10.8306 25.5026 10.4551 25.2564 9.75936L25.2553 9.75619L25.2542 9.75328L25.2371 9.70861C25.2203 9.66517 25.1918 9.59517 25.1513 9.50243C25.0701 9.31667 24.9403 9.04112 24.7546 8.70568C24.3818 8.03259 23.7913 7.13232 22.9276 6.23429C21.2216 4.46064 18.4303 2.66667 13.9908 2.66667C9.55119 2.66667 6.75988 4.46064 5.05392 6.23429C4.19016 7.13232 3.59968 8.03259 3.22692 8.70568C3.04118 9.04112 2.91141 9.31667 2.83018 9.50243C2.78964 9.59517 2.76135 9.66517 2.74439 9.70861L2.72623 9.75619Z"
          fill={color}
        />
        <Path
          d="M8.3949 10.6667C8.3949 7.72119 10.9004 5.33337 13.991 5.33337C17.0817 5.33337 19.5872 7.72119 19.5872 10.6667C19.5872 13.6122 17.0817 16 13.991 16C10.9004 16 8.3949 13.6122 8.3949 10.6667Z"
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

export default ViewSVG;
