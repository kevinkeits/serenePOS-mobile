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


interface IBillTemplate {
  useTax: string;
  taxValue: string;
  useServiceCharge: string;
  serviceChargeValue: string;
  templateStyle: string;
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
    const [billTemplate, setBillTemplate] = React.useState<IBillTemplate>();

    const printReceipt = async (templateID: string) => {
      if (currentPrinter && detailData) {
        if (currentPrinter.macAddress != '') {
          requestMultiple([PERMISSIONS.ANDROID.BLUETOOTH_CONNECT]).then(async (statuses) => {
            if (statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] == 'granted') {
              console.log("[Transaction] Printing Receipt", detailData)

              let text = '';
              
              if (templateID == '01') // default
              {
                if (detailData.details.clientImage != '' && detailData.details.clientImage != null) text = '[L]<img>' + detailData.details.clientImage + '</img>\n';
                text +=   "[L]<font size='big'>" + detailData.details.clientName + "</font>\n" +
                '[L]\n' +
                "[L]Order: <u>" + detailData.details.transactionNumber + "</u>\n" +
                '[L]' + detailData?.details.transactionDate + "\n" +
                '[C]================================\n';
                if (detailData.details.isPaid == '0') {
                  text += '[C]UNPAID BILL\n' + '[C]================================\n';
                }
                text += '[L]\n';
                if (detailData?.detailsProduct) {
                  for (let index = 0; index < detailData?.detailsProduct.length; index++) {
                    text += '[L]<b>' + detailData?.detailsProduct[index].productName + ' x' + detailData?.detailsProduct[index].qty +  '</b>[R]' + ' Rp' + parseInt(detailData?.detailsProduct[index].unitPrice).toLocaleString() + '\n';
                    if (parseInt(detailData.detailsProduct[index].discount) > 0) {
                      text += '[L]Discount: [R]-Rp' + parseInt(detailData.detailsProduct[index].discount).toLocaleString() + '\n';
                    }
                    if (detailData?.detailsVariant) {
                      const listVariant = detailData?.detailsVariant.filter(variant => variant.transactionProductID === detailData?.detailsProduct[index].transactionProductID)
                      for (let x = 0; x < listVariant.length; x++) {
                        text += '[L]' + listVariant[x].name + ': ' + listVariant[x].label + '[R]+Rp' +parseInt(listVariant[x].price).toLocaleString()+ '' + '\n';
                      }
                    }
                    if (detailData.detailsProduct[index].notes != '') text += '[L] Notes: ' + detailData.detailsProduct[index].notes + '\n';
                  }
                }
                text += '[C]--------------------------------\n' +
                '[L]SUBTOTAL: [R]Rp' + parseInt(detailData.details.subTotal).toLocaleString() + '\n';

                let subTotal = parseInt(detailData.details.subTotal)
                const discount = parseInt(detailData.details.discount)
                let serviceChargeParam = parseInt('0')
                let serviceChargeValue = parseInt('0')
                let taxValueParam = parseInt('0')
                let taxValue = parseInt('0')
                let total = parseInt(detailData.details.totalPayment)
                if (billTemplate != undefined)
                {
                  if (billTemplate.useServiceCharge == 'T') serviceChargeParam = parseInt(billTemplate.serviceChargeValue)
                  if (billTemplate.useTax == 'T') taxValueParam = parseInt(billTemplate.useTax)
                }
                if (discount > 0) {
                  subTotal = subTotal - discount
                  text += '[L]DISCOUNT: [R]-Rp' + parseInt(detailData.details.discount).toLocaleString() + '\n';
                }
                if (serviceChargeParam > 0) {
                  serviceChargeValue = (subTotal * serviceChargeParam) / 100;
                  subTotal = subTotal + serviceChargeValue
                  text += '[L]SERVICE CHARGE: [R]-Rp' + serviceChargeValue.toLocaleString() + '\n';
                }
                if (taxValueParam > 0) {
                  taxValue = (subTotal * taxValueParam) / 100;
                  subTotal = subTotal + taxValue
                  text += '[L]TAX: [R]-Rp' + taxValue.toLocaleString() + '\n';
                }
                total = subTotal
                text += '[L]TOTAL: [R]Rp' + total.toLocaleString() + '\n';
              }

              const transDate = new Date(detailData?.details.transactionDate).toISOString().slice(0, 10);
              let totalItem = 0

              if (templateID == '02') // BUSABA
              {
                text += "[C]BUSABA\n" +
                "[C]Pacific Place Mall\n" +
                "[C]Telp 02157973559\n" +
                '[C]------------------------------------------\n' +
                "[L]Date[L]: "+ moment(transDate).format('DD-MM-YYYY HH:mm') +"\n" +
                "[L]Time In[L]: "+ moment(transDate).add(-2, 'hour').format('DD-MM-YYYY HH:mm') +"\n" +
                '[L]Server[L]: Novita' +"\n" +
                '[L]Table[L]: 51' +"\n" +
                '[L]Pax[L]: 5' +"\n" +
                '[L]Cashier[L]: WAHYU' +"\n" +
                '[L]Print[L]: 1' +"\n" +
                '[C]------------------------------------------\n';
                if (detailData?.detailsProduct) {
                  for (let index = 0; index < detailData?.detailsProduct.length; index++) {
                    text += '[L]' + detailData?.detailsProduct[index].qty + (detailData?.detailsProduct[index].qty.toString().length == 1 ? ' ' : '') + '    ' + detailData?.detailsProduct[index].productName.toUpperCase() + '[R]' + parseInt(detailData?.detailsProduct[index].unitPrice).toLocaleString().replace(',','.').replace(',','.') + '\n';
                    totalItem += detailData?.detailsProduct[index].qty;
                  }
                }
                text += '[C]------------------------------------------\n';
                text += '[L]' + totalItem.toString() + ' items\n';

                let subTotal = parseInt(detailData.details.subTotal)
                const discount = parseInt(detailData.details.discount)
                let serviceChargeParam = parseFloat('7.5')
                let serviceChargeValue = parseInt('0')
                let taxValueParam = parseFloat('10')
                let taxValue = parseInt('0')

                text += '[L][R]Subtotal :[R]' + subTotal.toLocaleString().replace(',','.').replace(',','.') + '\n';
                if (serviceChargeParam > 0) {
                  serviceChargeValue = (parseFloat(subTotal.toString()) * serviceChargeParam) / parseFloat('100');
                  subTotal = subTotal + serviceChargeValue
                  text += '[L][R]SC :[R]' + serviceChargeValue.toLocaleString().replace(',','.').replace(',','.') + '\n';
                }
                if (taxValueParam > 0) {
                  taxValue = parseInt(((parseFloat(subTotal.toString()) * taxValueParam) / parseFloat('100')).toString());
                  subTotal = subTotal + taxValue
                  text += '[L][R]Tax Total :[R]' + taxValue.toLocaleString().replace(',','.').replace(',','.') + '\n';
                }
                text += '[R]---------------------------------\n';
                text += '[L][R]Total :[R]' + subTotal.toLocaleString().replace(',','.').replace(',','.') + '\n';
                text += '[L][R]Rounding :[R]0' + '\n';
                text += '[R]---------------------------------\n';
                text += '[L][R]Grand Total :[R]' + subTotal.toLocaleString().replace(',','.').replace(',','.') + '\n';
                text += '[L][R]BRI CARD - nn :[R]' + subTotal.toLocaleString().replace(',','.').replace(',','.') + '\n\n';
                text += '[C]------------------------------------------\n';
              }

              if (templateID == '03') // KADO
              {
                text += "[C]KADO RESTAURANT - AYANA MIDPLAZA JAKARTA\n" +
                "[C]LG Floor, Jl. Jendral Sudirman Kav. 10-1\n" +
                "[C]1, Jakarta 10220\n" +
                '[C]------------------------------------------\n' +
                '[L]No[L]: KAJ' + moment(transDate).format('YYYYMMDD0021') +"\n" +
                '[L]Sales No[L]: SKAJ171989575902' +"\n" +
                "[L]Date[L]: "+ moment(transDate).format('DD-MM-YYYY HH:mm') +"\n" +
                "[L]Time In[L]: "+ moment(transDate).add(-2, 'hour').format('DD-MM-YYYY HH:mm') +"\n" +
                '[L]Loyalty Member[L]: Jeng Rizky A' +"\n" +
                '[L]Server[L]: TRI NOFIRA' +"\n" +
                '[L]Table[L]: V2A' +"\n" +
                '[L]Pax[L]: 5' +"\n" +
                '[L]Cashier[L]: azizah' +"\n" +
                '[C]------------------------------------------\n';
                let discount = 0
                if (detailData?.detailsProduct) {
                  for (let index = 0; index < detailData?.detailsProduct.length; index++) {
                    const unitPrice = parseInt(detailData?.detailsProduct[index].unitPrice)
                    const unitDisc = (unitPrice * 10 / 100)
                    text += '[L]' + detailData?.detailsProduct[index].qty + (detailData?.detailsProduct[index].qty.toString().length == 1 ? ' ' : '') + '    ' + detailData?.detailsProduct[index].productName.toUpperCase() + '[R]' + unitPrice.toLocaleString().replace(',','.').replace(',','.') + '\n';
                    text += '[L]      KAWANO MEMBER 10%...' + '[R]-' + unitDisc.toLocaleString().replace(',','.').replace(',','.') + '\n';
                    totalItem += detailData?.detailsProduct[index].qty;
                    discount += unitDisc;
                  }
                }
                text += '[C]------------------------------------------\n';
                text += '[L]' + totalItem.toString() + ' items\n';

                let subTotal = parseInt(detailData.details.subTotal)
                let serviceChargeParam = parseFloat('10')
                let serviceChargeValue = parseInt('0')
                let taxValueParam = parseFloat('10')
                let taxValue = parseInt('0')

                text += '[L][R]Subtotal :[R]' + subTotal.toLocaleString().replace(',','.').replace(',','.') + '\n';
                subTotal = subTotal - discount
                text += '[L][R]Menu Discount :[R]-' + discount.toLocaleString().replace(',','.').replace(',','.') + '\n';
                if (serviceChargeParam > 0) {
                  serviceChargeValue = (parseFloat(subTotal.toString()) * serviceChargeParam) / parseFloat('100');
                  subTotal = subTotal + serviceChargeValue
                  text += '[L][R]SC :[R]' + serviceChargeValue.toLocaleString().replace(',','.').replace(',','.') + '\n';
                }
                if (taxValueParam > 0) {
                  taxValue = parseInt(((parseFloat(subTotal.toString()) * taxValueParam) / parseFloat('100')).toString());
                  subTotal = subTotal + taxValue
                  text += '[L][R]PB1 :[R]' + taxValue.toLocaleString().replace(',','.').replace(',','.') + '\n';
                }
                text += '[R]---------------------------------\n';
                text += '[L][R]Grand Total :[R]' + subTotal.toLocaleString().replace(',','.').replace(',','.') + '\n\n';
                text += '[L][R]BRI CARD - nn :[R]' + subTotal.toLocaleString().replace(',','.').replace(',','.') + '\n\n';
                text += '[C]------------------------------------------\n';
              }
              

              if (templateID == '01') {
                if (detailData.details.isPaid == '1') {
                  text += '[L]PAYMENT: [R]' + detailData.details.payment + '\n' +
                  '[L]PAID: [R]Rp' + parseInt(detailData.details.paymentAmount).toLocaleString() + '\n' +
                  '[L]CHANGES: [R]Rp' + parseInt(detailData.details.changes).toLocaleString() + '\n' +
                  '[L]\n' +
                  '[C]================================\n' +
                  '[C]THANK YOU\n' ;

                  //"[L]<font size='tall'>Customer :</font>\n" +
                  //'[L]GUEST\n' +
                  //'[L]\n' +
                  //"[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
                  //"[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>\n" +
                  // '[L]\n' +
                  // '[L]\n' +
                  // '[L]\n' +
                  // '[L]\n' +
                  
                } else {
                  text += '[C]================================\n' +
                  '[C]UNPAID BILL\n';
                }
              }
                          
                          
              if (text != '') {
                console.log(text)
                await ThermalPrinterModule.printBluetooth({
                  payload: text,
                  printerNbrCharactersPerLine: templateID == '01' ? 10 : 42,
                  printerWidthMM: templateID == '01' ? 50 : 80,
                  mmFeedPaper: 100,
                  autoCut: false
                });
              }
              else
              {
                Alert.alert('Error', 'Nothing to print');
              }
              
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
        const tempTemplate = await AsyncStorage.getItem('billTemplateData');  

        if (token) {
          if (tempPrinter) {
            const printerData = JSON.parse(tempPrinter ?? '')
            setCurrentPrinter(printerData)
          }

          if (tempTemplate) {
            const templateData = JSON.parse(tempTemplate ?? '')
            setBillTemplate(templateData)
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
