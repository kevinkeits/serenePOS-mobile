// sqliteHelper.ts
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

// Function to check network status and show alerts
export const checkNetworkStatus = async () => {
  try {
    const state = await NetInfo.fetch();
    const onlineStatus = state.isConnected ?? false;

    // Show alert only if network status has changed
    // if (!onlineStatus) {
    //   Alert.alert('Network Status', 'You are offline.');
    // } else {
    //   Alert.alert('Network Status', 'You are online.');
    // }

    return onlineStatus;
  } catch (error) {
    console.error('Error fetching network status:', error);
    // Show alert for offline status in case of error
    Alert.alert('Network Status', 'You are offline.');
    return false; // Default to offline
  }
};
