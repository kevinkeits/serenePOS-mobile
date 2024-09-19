import React, { useEffect, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';
import NetInfo from '@react-native-community/netinfo';
import AppNavigator from './src/Routes/AppNavigator/AppNavigator';
import {  Alert } from 'react-native'
import { createTable } from './src/helpers/sqliteFunctions';

const App = () => {

  React.useEffect(() => {

    const productColumns = `
    id TEXT PRIMARY KEY, 
    name TEXT, 
    price TEXT, 
    notes TEXT, 
    imgUrl TEXT, 
    qty INTEGER
  `;
  createTable('MsProduct', productColumns);

  const categoryColumns = `
  id TEXT PRIMARY KEY, 
  name TEXT, 
  qtyAlert TEXT, 
  totalItem TEXT, 
  bgColor TEXT
`;
  createTable('MsCategory', categoryColumns);

  const transactionColumns = `
  id TEXT PRIMARY KEY, 
  transactionNumber TEXT, 
  transactionDate TEXT, 
  paidDate TEXT, 
  customerName TEXT, 
  paymentID TEXT, 
  payment TEXT, 
  description TEXT, 
  isActive INTEGER, 
  status TEXT, 
  totalPayment TEXT, 
  isPaid TEXT
`;
createTable('MsTransaction', transactionColumns);

const paymentColumns = `
  id TEXT PRIMARY KEY, 
  clientID TEXT, 
  name TEXT, 
  description TEXT, 
  isActive TEXT
`;
createTable('MsPayment', paymentColumns);
 
const variantColumns = `
  id TEXT PRIMARY KEY, 
  name TEXT, 
  type TEXT, 
  count INTEGER, 
  listLabel TEXT
`;
createTable('MsVariant', variantColumns);

  const outletColumns = `
    id TEXT PRIMARY KEY, 
    outlet TEXT, 
    isPrimary INTEGER, 
    address TEXT, 
    province TEXT, 
    district TEXT, 
    phoneNumber TEXT, 
    subDistrict TEXT, 
    postalCode TEXT
  `;
  createTable('MsOutlet', outletColumns);

  const settingColumns = `
    id TEXT PRIMARY KEY, 
    storeName TEXT, 
    name TEXT, 
    phoneNumber TEXT, 
    email TEXT, 
    outletID TEXT, 
    outletName TEXT, 
    accountImage TEXT, 
    clientImage TEXT
  `;
  createTable('MsSetting', settingColumns);

  
  }, []);

  return <AppNavigator />;
};

export default App;
