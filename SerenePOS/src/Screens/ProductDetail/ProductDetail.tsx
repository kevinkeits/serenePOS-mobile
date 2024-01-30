// ProductDetail.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Coffee } from '../Sales/Sales';


  
  type Props = {
    route: {
        params: {
          selectedData: Coffee; 
        };
      };
  };


const ProductDetail = ({ route }: Props) => {
  const { selectedData } = route.params;

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Product Detail</Text>
      <Text>{selectedData.title}</Text>
      <Text>Rp {selectedData.price}</Text>
    </View>
  );
};

export default ProductDetail;
