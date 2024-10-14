import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AppNavigator from './src/Routes/AppNavigator/AppNavigator';

LogBox.ignoreLogs(['EventEmitter.removeListener']); // Ignore warnings from NetInfo

const App = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        console.log('Online');
        // Sync data here if necessary
      } else {
        console.log('Offline');
        // Handle offline mode
      }
    });

    // Initial check
    NetInfo.fetch().then(state => {
      console.log(state.isConnected ? 'Online' : 'Offline');
    });

    return () => unsubscribe();
  }, []);

  return <AppNavigator />;
};

export default App;
