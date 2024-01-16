// CommonLayout.tsx
import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomHeader from '../CustomHeader/CustomHeader';
import Sidebar from '../Sidebar/Sidebar';

interface CommonLayoutProps {
  children: ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <View style={styles.container}>
    <CustomHeader />
    <View style={styles.containerRow}>
      <Sidebar />
      <View style={styles.content}>{children}</View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row', // Arrange children in a row
  },
  content: {
    flex: 1,
    padding: 10,
  },
});

export default CommonLayout;
