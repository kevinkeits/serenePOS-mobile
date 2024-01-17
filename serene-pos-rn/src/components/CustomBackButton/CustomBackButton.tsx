import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomBackButton = () => {
    const navigation = useNavigation();

  const handleBackPress = () => {
    // Custom logic, e.g., navigate to a specific screen
    navigation.navigate('Profile' as never); // Navigate to the "Profile" screen
  };

  return (
    <TouchableOpacity onPress={handleBackPress}>
      <Text>Custom Back</Text>
    </TouchableOpacity>
  );
};

export default CustomBackButton;
