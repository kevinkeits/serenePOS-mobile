// Import necessary modules
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Platform, StyleSheet } from 'react-native';
import CommonLayout from '../../Components/CommonLayout/CommonLayout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import DetailModal from './components/DetailModal/DetailModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ApiUrls } from '../../apiUrls/apiUrls';




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
  transactionProductID: string;
  productID: string;
  variantOptionID: string;
  label: string;
  price: string;
}

interface GroupedTransactions {
  [date: string]: Transaction[];
}

  
  const TransactionHistory: React.FC = () => {
    const navigation = useNavigation();

    const [isOpenDetail, setIsOpenDetail] = React.useState(false);
    const [selectedID, setSelectedID] = React.useState('');
    const [transactionData, setTransactionData] = React.useState<Transaction[]>([]);
    const [detailData, setDetailData] = React.useState<TransactionDetail | null>(null);

    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('userData');     
        if (token) {
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
          console.log(data.detailsProduct)
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
  
      transactionData.forEach(transaction => {
        const date = new Date(transaction.transactionDate).toDateString();
        if (!groupedTransactions[date]) {
          groupedTransactions[date] = [];
        }
        groupedTransactions[date].push(transaction);
      });
  
      return Object.keys(groupedTransactions).map(date => (
        <View key={date}>
          <View style={{ backgroundColor: '#E1E1E1', flexDirection: 'row', justifyContent: 'space-between', padding: 5, marginHorizontal: 10 }}>
            <Text style={{ fontSize: 10, color: 'black', fontWeight: 'bold' }}>{date}</Text>
          </View>
          {groupedTransactions[date].map(transaction => (
            <TouchableOpacity onPress={() => onOpenDetail(transaction.id)} style={{ borderBottomWidth: 0.5, borderBottomColor: '#E1E1E1', gap: 5, paddingVertical: 10, paddingHorizontal: 5, marginHorizontal: 10 }} key={transaction.transactionNumber}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <Text style={{ fontSize: 10, color: 'black' }}>{transaction.transactionNumber}</Text>
                  <View style={{ backgroundColor: transaction.isPaid === '0' ? 'red' : 'white', width: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
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
      fetchData();
    }, []);



  return (
    <CommonLayout>
        <View style={{width:'100%'}}>
            <View style={{flexDirection: 'row', gap:10,  marginRight:30, marginVertical:10, alignItems:'center'}}>
                <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Transaction History</Text>
            </View>

        {/* <View>
                  <View style={{ backgroundColor:'#E1E1E1', flexDirection:'row', justifyContent:'space-between', padding:5, marginHorizontal:10}}>
                      <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Tuesday, 30 Jan 2024</Text>
                  </View>
                  <TouchableOpacity onPress={() => onOpenDetail('1')} style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1',gap:5, paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', gap:5}}>
                          <Text style={{fontSize:10, color:'black'}}>SE00530012024</Text>
                          <View style={{backgroundColor: 'red', width:30,justifyContent:'center', alignItems:'center', borderRadius:5 }}>
                            <Text style={{textAlign:'center', fontSize:6, color:'white', fontWeight:'bold'}}>Unpaid</Text>
                          </View>
                          </View>
                          <Text style={{fontSize:7, color:'black'}}>30-Jan-2024 11:25:12</Text>
                          
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={{fontSize:10, color:'black'}}>Aulia</Text>
                          <View style={{}}></View>
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <View style={{}}></View>
                          <Text style={{fontSize:10, color:'black',fontWeight:'bold'}}>Rp 45.000</Text>
                      </View>                    
                  </TouchableOpacity>

                  <TouchableOpacity style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1',gap:5, paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', gap:5}}>
                          <Text style={{fontSize:10, color:'black'}}>SE00530012024</Text>
                          <View style={{backgroundColor: 'red', width:30,justifyContent:'center', alignItems:'center', borderRadius:5 }}>
                            <Text style={{textAlign:'center', fontSize:6, color:'white', fontWeight:'bold'}}>Unpaid</Text>
                          </View>
                          </View>
                          <Text style={{fontSize:7, color:'black'}}>30-Jan-2024 11:25:12</Text>
                          
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={{fontSize:10, color:'black'}}>Aulia</Text>
                          <View style={{}}></View>
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <View style={{}}></View>
                          <Text style={{fontSize:10, color:'black',fontWeight:'bold'}}>Rp 45.000</Text>
                      </View>                    
                  </TouchableOpacity>
      </View>
      <View>
                  <View style={{ backgroundColor:'#E1E1E1', flexDirection:'row', justifyContent:'space-between', padding:5, marginHorizontal:10}}>
                      <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Monday, 30 Jan 2024</Text>
                  </View>
                  <TouchableOpacity style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1',gap:5, paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', gap:5}}>
                          <Text style={{fontSize:10, color:'black'}}>SE00530012024</Text>
                          <View style={{backgroundColor: 'red', width:30,justifyContent:'center', alignItems:'center', borderRadius:5 }}>
                            <Text style={{textAlign:'center', fontSize:6, color:'white', fontWeight:'bold'}}>Unpaid</Text>
                          </View>
                          </View>
                          <Text style={{fontSize:7, color:'black'}}>29-Jan-2024 11:25:12</Text>
                          
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={{fontSize:10, color:'black'}}>Samuel</Text>
                          <View style={{}}></View>
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <View style={{}}></View>
                          <Text style={{fontSize:10, color:'black',fontWeight:'bold'}}>Rp 45.000</Text>
                      </View>                    
                  </TouchableOpacity>

                  <TouchableOpacity style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1',gap:5, paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', gap:5}}>
                          <Text style={{fontSize:10, color:'black'}}>SE00530012024</Text>
                          <View style={{backgroundColor: 'red', width:30,justifyContent:'center', alignItems:'center', borderRadius:5 }}>
                            <Text style={{textAlign:'center', fontSize:6, color:'white', fontWeight:'bold'}}>Unpaid</Text>
                          </View>
                          </View>
                          <Text style={{fontSize:7, color:'black'}}>29-Jan-2024 11:25:12</Text>
                          
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={{fontSize:10, color:'black'}}>Aulia</Text>
                          <View style={{}}></View>
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <View style={{}}></View>
                          <Text style={{fontSize:10, color:'black',fontWeight:'bold'}}>Rp 45.000</Text>
                      </View>                    
                  </TouchableOpacity>
      </View> */}
      {renderTransactionByDate()}
            {/* <View style={{marginHorizontal:10, backgroundColor:'#2563EB', width:'20%', justifyContent:'flex-end', alignSelf:'flex-end', borderRadius:5, marginBottom:10}}>
                <TouchableOpacity style={{paddingVertical:6}}>
                    <Text style={{color:'white', fontSize:8, textAlign:'center'}}>Print Receipt</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:10, borderWidth:0.5, borderColor:'#2563EB', width:'20%', justifyContent:'flex-end', alignSelf:'flex-end', borderRadius:5, marginBottom:10}}>
                <TouchableOpacity onPress={()=> navigation.goBack()} style={{paddingVertical:6}}>
                    <Text style={{color:'black', fontSize:8, textAlign:'center'}}>Close</Text>
                </TouchableOpacity>
            </View> */}
        

        </View>

        <DetailModal isVisible={isOpenDetail} selectedID={selectedID} onClose={onCloseDetail} selectedData={detailData} />
    </CommonLayout>
  );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 6,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 6,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 5,
        right: 15,
      },
});

export default TransactionHistory
