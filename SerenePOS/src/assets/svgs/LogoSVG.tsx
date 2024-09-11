import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';


interface Props {
    width: string;
    height: string;
    color?: string;
}
const LogoSVG = ({width, height, color}:Props) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 132 119" fill="none">
        <Path
          d="M56.1042 118.25C61.5235 118.25 65.9167 113.857 65.9167 108.438C65.9167 103.018 61.5235 98.625 56.1042 98.625C50.6849 98.625 46.2917 103.018 46.2917 108.438C46.2917 113.857 50.6849 118.25 56.1042 118.25Z"
          fill={color}
        />
        <Path
          d="M101.896 118.25C107.315 118.25 111.708 113.857 111.708 108.438C111.708 103.018 107.315 98.625 101.896 98.625C96.4766 98.625 92.0834 103.018 92.0834 108.438C92.0834 113.857 96.4766 118.25 101.896 118.25Z"
          fill={color}
        />
        <Path
          d="M124.792 26.6667H35.3932L27.8442 8.54628C26.8532 6.15951 25.1759 4.12068 23.0249 2.68823C20.8739 1.25578 18.346 0.494204 15.7617 0.500033H0.5V13.5834H15.7683L46.7954 88.0602C47.8093 90.4937 50.197 92.0834 52.8333 92.0834H105.167C107.895 92.0834 110.335 90.3891 111.296 87.8444L130.921 35.511C131.289 34.5206 131.412 33.456 131.28 32.4078C131.148 31.3596 130.765 30.3588 130.163 29.4905C129.561 28.6222 128.758 27.912 127.823 27.4204C126.888 26.9288 125.848 26.6702 124.792 26.6667ZM79 79L59.375 59.375H72.4583V39.75H85.5417V59.375H98.625L79 79Z"
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

export default LogoSVG;
