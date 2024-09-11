import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Realm from 'realm';
import AppNavigator from './src/Routes/AppNavigator/AppNavigator';

LogBox.ignoreLogs(['EventEmitter.removeListener']); // Ignore warnings from NetInfo

// Define the User schema
const UserSchema: Realm.ObjectSchema = {
  name: 'User',
  properties: {
    id: 'int',
    name: 'string',
    email: 'string',
    synced: { type: 'bool', default: false },  // 'bool' type with a default value
  },
  primaryKey: 'id',
};

// Create a new Realm instance
const realm = new Realm({
  schema: [UserSchema],
});

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
