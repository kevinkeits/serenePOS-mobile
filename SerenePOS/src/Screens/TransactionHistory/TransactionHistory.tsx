// Import necessary modules
import React from 'react';
import { View, Text,StyleSheet, Alert } from 'react-native';
import CommonLayout from '../../Components/CommonLayout/CommonLayout';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import DetailModal from './components/DetailModal/DetailModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ApiUrls } from '../../apiUrls/apiUrls';
import moment from 'moment';


import ThermalPrinterModule from 'react-native-thermal-printer';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { parse } from 'react-native-svg';
ThermalPrinterModule.defaultConfig = {
  ...ThermalPrinterModule.defaultConfig,
  ip: '',
  port: 9100,
  autoCut: false,
  timeout: 30000, // in milliseconds (version >= 2.2.0)
};
interface IBLEPrinter {
  deviceName: string;
  macAddress: string;
  status?: string;
}




export interface Transaction {
  id: string;
  transactionNumber: string;
  transactionDate: string;
  paidDate: string;
  customerName: string;
  paymentID: string;
  payment: string;
  description: string;
  isActive: number;
  status: string
  totalPayment: string;
  isPaid: string;
}

export interface TransactionDetail {
  details: DetailsTransaction
  detailsProduct: DetailsProductTransaction[]
  detailsVariant: DetailsVariantTransaction[]
}

export interface DetailsTransaction {
  transactionID: string;
  clientImage: string;
  clientName: string;
  transactionNumber: string;
  transactionDate: string;
  userIn: string;
  customerName: string;
  outletName: string;
  paymentID: string;
  payment: string
  name: string;
  description: string;
  isActive: number;
  subTotal: string;
  discount: string;
  tax: string;
  totalPayment: string;
  paymentAmount: string;
  changes: string;
  isPaid: string;
  notes: string;
}

export interface DetailsProductTransaction {
  transactionProductID: string;
  productID: string;
  productName: string;
  qty: number;
  unitPrice: string;
  discount: string;
  unitPriceAfterDiscount: string;
  notes: string;
}

export interface DetailsVariantTransaction {
  id: string;
  isSelected: string
  transactionProductID: string;
  productID: string;
  productVariantOptionID: string
  type: string
  variantID: string;
  variantOptionID: string;
  label: string;
  name: string
  price: string;
}

export interface GroupedTransactions {
  [date: string]: Transaction[];
}

  
  const TransactionHistory: React.FC = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [currentPrinter, setCurrentPrinter] = React.useState<IBLEPrinter>();
    const [isOpenDetail, setIsOpenDetail] = React.useState(false);
    const [selectedID, setSelectedID] = React.useState('');
    const [transactionData, setTransactionData] = React.useState<Transaction[]>([]);
    const [detailData, setDetailData] = React.useState<TransactionDetail | null>(null);

    const printReceipt = async () => {
      if (currentPrinter && detailData) {
        if (currentPrinter.macAddress != '') {
          requestMultiple([PERMISSIONS.ANDROID.BLUETOOTH_CONNECT]).then(async (statuses) => {
            if (statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] == 'granted') {
              console.log("[Transaction] Printing Receipt", detailData)

              let text = '';
              if (detailData.details.clientImage != '') text = '[L]<img>' + detailData.details.clientImage + '</img>\n';

              text +=   "[L]<font size='big'>" + detailData.details.clientName + "</font>\n" +
                          '[L]\n' +
                          "[L]Order: <u>" + detailData.details.transactionNumber + "</u>\n" +
                          '[L]' + detailData?.details.transactionDate +
                          '[L]\n' +
                          '[C]================================\n';
                          

                          if (detailData.details.isPaid == '0') {
                            text += '[C]UNPAID BILL\n' + '[C]================================\n';
                          }

                          text += '[L]\n';

                          if (detailData?.detailsProduct) {
                            for (let index = 0; index < detailData?.detailsProduct.length; index++) {
                              text += '[L]<b>' + detailData?.detailsProduct[index].productName + ' x ' + detailData?.detailsProduct[index].qty +  '</b>[R]' + ' Rp' + parseInt(detailData?.detailsProduct[index].unitPrice).toLocaleString() + '\n';
                              if (parseInt(detailData.detailsProduct[index].discount) > 0) {
                                text += '[L] Discount : -Rp' + parseInt(detailData.detailsProduct[index].discount).toLocaleString() + '\n';
                              }
                              if (detailData?.detailsVariant) {
                                const listVariant = detailData?.detailsVariant.filter(variant => variant.transactionProductID === detailData?.detailsProduct[index].transactionProductID)
                                for (let x = 0; x < listVariant.length; x++) {
                                  text += '[L] ' + listVariant[x].name + ' : ' + listVariant[x].label + '(+ Rp' +parseInt(listVariant[x].price).toLocaleString()+ ')' + '\n';
                                }
                              }
                              text += '[L] Notes: ' + detailData.detailsProduct[index].notes + '\n';
                              text += '[L]\n';
                            }
                          }

                      text += '[C]--------------------------------\n' +
                          '[R]TOTAL :[R] Rp' + parseInt(detailData.details.totalPayment).toLocaleString() + '\n';

                          if (parseInt(detailData.details.discount) > 0) {
                            text += '[R]DISCOUNT :[R] -Rp' + parseInt(detailData.details.discount).toLocaleString() + '\n';
                          }
                          if (detailData.details.isPaid == '1') {
                            text += '[R]PAYMENT METHOD :[R] ' + detailData.details.payment + '\n' +
                            '[R]PAID :[R] Rp' + parseInt(detailData.details.paymentAmount).toLocaleString() + '\n' +
                            '[R]CHANGES :[R] Rp' + parseInt(detailData.details.changes).toLocaleString() + '\n' +
                            //'[R]TAX :[R]4.23e\n' +
                            '[L]\n' +
                            '[C]================================\n' +
                            '[C]THANK YOU\n' +
                            '[L]\n' +
                            //"[L]<font size='tall'>Customer :</font>\n" +
                            //'[L]GUEST\n' +
                            //'[L]\n' +
                            //"[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
                            //"[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>\n" +
                            // '[L]\n' +
                            // '[L]\n' +
                            // '[L]\n' +
                            // '[L]\n' +
                            '[L]\n';
                          } else {
                            text += '[C]================================\n' +
                            '[C]UNPAID BILL\n';
                          }
                          
                          
              await ThermalPrinterModule.printBluetooth({
                payload: text,
                printerNbrCharactersPerLine: 10,
              });
            }
          });
        } else {
          Alert.alert('Error', 'Printer is not connected, please connect to any Printer to Print Receipt');
        }
      } else {
        Alert.alert('Error', 'Printer is not connected, please connect to any Printer to Print Receipt');
      }
    }

    const fetchData = async () => {
      console.log('[Transaction History] fetching data')
      try {
        const token = await AsyncStorage.getItem('userData');     
        const tempPrinter = await AsyncStorage.getItem('printerData'); 

        if (token) {
          if (tempPrinter) {
            const printerData = JSON.parse(tempPrinter ?? '')
            setCurrentPrinter(printerData)
          }

          const authToken = JSON.parse(token).data.Token
          const response = await axios.get(ApiUrls.getTransaction, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });           
          const data: Transaction[] = response.data.data;
          setTransactionData(data);
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchDetail = async (id: string) => {
      try {
        const token = await AsyncStorage.getItem('userData'); 
        const transactionDetailUrl = ApiUrls.getTransactionDetail(id);    
        if (token) {
          const authToken = JSON.parse(token).data.Token
          const response = await axios.get(transactionDetailUrl, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });           
          const data: TransactionDetail = response.data.data;
          if (id !== '') {
          
          setDetailData(data);
        }
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const onCloseDetail = () => {
      setIsOpenDetail(false);
    };

    const onOpenDetail = (id: string) => {
      fetchDetail(id)
      setSelectedID(id)
      setIsOpenDetail(true);
    };

    const renderTransactionByDate = () => {
      const groupedTransactions: GroupedTransactions = {};
      const sumByDate: { [key: string]: number } = {};

  
      transactionData.forEach(transaction => {
        const date = new Date(transaction.transactionDate).toISOString().slice(0, 10);

        if (!groupedTransactions[date]) {
          groupedTransactions[date] = [];
          sumByDate[date] = 0;
        }
        groupedTransactions[date].push(transaction);
        if (transaction.isPaid === '1') { 
          sumByDate[date] += parseInt(transaction.totalPayment);
        }
      });
  
      return Object.keys(groupedTransactions).map(date => (
        <View key={date}>
          <View style={{ backgroundColor: '#E1E1E1', flexDirection: 'row', justifyContent: 'space-between', padding: 5, marginHorizontal: 10 }}>
            <Text style={{ fontSize: 10, color: 'black', fontWeight: 'bold' }}>{moment(date).format('dddd, D MMM YYYY')}</Text>
            <Text style={{ fontSize: 10, color: 'black', fontWeight: 'bold' }}>Rp {sumByDate[date].toLocaleString()}</Text>
          </View>
          {groupedTransactions[date].map(transaction => (
            <TouchableOpacity onPress={() => onOpenDetail(transaction.id)} style={{ borderBottomWidth: 0.5, borderBottomColor: '#E1E1E1', gap: 5, paddingVertical: 10, paddingHorizontal: 5, marginHorizontal: 10 }} key={transaction.id}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <Text style={{ fontSize: 10, color: 'black' }}>{transaction.transactionNumber}</Text>
                  <View style={{ backgroundColor: transaction.isPaid === '0' ? '#EB2525' : 'white', width: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{ textAlign: 'center', fontSize: 6, color: 'white', fontWeight: 'bold' }}>{transaction.isPaid == '0' ? 'Unpaid' : ''}</Text>
                  </View>
                </View>
                <Text style={{ fontSize: 7, color: 'black' }}>{transaction.transactionDate}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 10, color: 'black' }}>{transaction.customerName}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 9, color: 'grey' }}>{transaction.payment}</Text>
                <Text style={{ fontSize: 10, color: 'black', fontWeight: 'bold' }}>Rp {parseInt(transaction.totalPayment).toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ));
    };
  
    React.useEffect(() => {
      if (isFocused) fetchData();
    }, [isFocused]);



  return (
    <CommonLayout>
      <View style={{flexDirection: 'row', gap:10,  marginRight:30, marginVertical:10, alignItems:'center'}}>
          <Text style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Transaction History</Text>
      </View>
      <ScrollView>
      {transactionData.length > 0 ? (
      <View style={{width:'100%'}}>
          {renderTransactionByDate()} 
      </View>
      ):(
        <View style={{width:'100%', marginTop:'20%', justifyContent:'center', alignItems:'center'}}>
          <Text>No Transaction</Text>
      </View>
      )}
        </ScrollView>

        <DetailModal isVisible={isOpenDetail} selectedID={selectedID} onClose={onCloseDetail} selectedData={detailData} onPrint={printReceipt} />
    </CommonLayout>
  );
};


export default TransactionHistory
