import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ApiUrls } from '../../../../apiUrls/apiUrls';
import { Payment } from '../../Sales';
import OtherPaymentModal from '../OtherPayment/OtherPayment';
import ReceivedCashModal from '../ReceivedCashModal/ReceivedCashModal';


interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSave: (data: TransactionForm) => void
  totalPrice: number
  discountOverall?: DiscountOverall
  data: Payment[]


  // paymentID?: string
  customerName?: string
  subtotal?: string
  discount?: string
  tax?: string
  totalPayment?: string
  // paymentAmount?: string
  // changes?: string
  // isPaid?: string
  // notes?: string
  productID?: string
  qty?: string
  unitPrice?: string
  discountProduct?: string
  notesProduct?: string
  transactionProductID?: string
  transactionProductIDVariant?: string
  variantOptionID?: string
  variantLabel?: string
  variantPrice?: string
}

export interface TransactionForm {
    id: string
    action: string
   paymentID?: string
   customerName?: string
   subtotal?: string
   discount?: string
   tax?: string
   totalPayment?: string
   paymentAmount?: string
   changes?: string
   isPaid?: string
   notes?: string
   productID?: string
   qty?: string
   unitPrice?: string
   discountProduct?: string
   notesProduct?: string
   transactionProductID?: string
   transactionProductIDVariant?: string
   variantOptionID?: string
   variantLabel?: string
   variantPrice?: string
}

export interface DiscountOverall {
  isDiscount: string
  discountType: string;
  discountValue: string;
}


const PaymentMethodModal: React.FC<Props> = ({ 
  isVisible, 
  onClose,
  onSave, 
  totalPrice, 
  discountOverall, 
  data,

  customerName,
  subtotal,
  discount,
  tax,
  totalPayment,
  productID,
  qty,
  unitPrice,
  discountProduct,
  notesProduct,
  transactionProductID,
  transactionProductIDVariant,
  variantOptionID,
  variantLabel,
  variantPrice,
}) => {

    const [isOpenCash, setIsOpenCash] = React.useState(false);
    const [totalPriceState, setTotalPriceState] = React.useState(0);
    const [isOpenOtherPayment, setIsOpenOtherPayment] = React.useState(false);
    const [selectedPaymentID, setSelectedPaymentID] = React.useState('');
    const [selectedPaymentName, setSelectedPaymentName] = React.useState('');



    const onOpenCash = (paymentID: string, name: string) => {
        setIsOpenCash(true)
        setTotalPriceState(totalPrice)
        setSelectedPaymentID(paymentID)
        setSelectedPaymentName(name)
      };
    
      const onCloseCash = () => {
        setIsOpenCash(false);
      };

      const onOpenOtherPayment = () => {
        setIsOpenOtherPayment(true);
      };
    
      const onCloseOtherPayment = () => {
        setIsOpenOtherPayment(false);
      };

    const handleCloseAll = () => {
      onClose()
      onCloseCash()
    }

  //   const onSave = async (data: TransactionForm) => {
  //     try {
  //       const token = await AsyncStorage.getItem('userData'); 
  //       const url = ApiUrls.saveTransaction
  //       if (token) {
  //       const authToken = JSON.parse(token).data.Token
  //       const response = await axios.post(url, data, {
  //         headers: {
  //           'Authorization': `Bearer ${authToken}`
  //         }
  //       });
  //       if (response.status === 200) {
  //         if (response.data.status) {
  //           onCloseCash()
  //           // onCloseConfirmation()
  //           // setDeleteMode(false)
  //           // fetchData(selectedCategory)
  //         } else {
  //           Alert.alert('Error', response.data.message);
  //         }
  //       } else {
  //         Alert.alert('Error', 'Saving data failed');
  //       }
  //     }
  //     } catch (error) {
  //       console.error('Error during saving:', error);
  //       Alert.alert('Error', 'Something went wrong during saving data. Please try again.');
  //     }
  // };



  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.modalTitle}>Payment Method</Text>
            <View style={styles.underline}></View>
          </View>
          <Text style={{marginVertical:4, marginLeft: 20, fontSize:11, color:'black', fontWeight:'bold'}}>Select Payment</Text>
          <View style={{  borderBottomWidth:1, borderTopWidth:1, borderStyle:'dotted', borderColor:'grey',}}>
          <Text style={{textAlign:'center', fontSize:10, marginTop:10, color: 'black'}}>Total Bill</Text>
          <Text style={{textAlign:'center', fontSize:15, marginBottom:5, color: '#2563EB', fontWeight: 'bold'}}>Rp {totalPrice.toLocaleString()}</Text>

          {discountOverall?.isDiscount == '2' && (
            <View>
              <Text style={{textAlign:'center', fontSize:10, marginTop:2, color: 'black'}}>Discount Overall</Text>
              <Text style={{textAlign:'center', fontSize:15, marginBottom:10, color: '#2563EB', fontWeight: 'bold'}}>{discountOverall.discountType == '1' ? `Rp ${discountOverall.discountValue}` : `${discountOverall.discountValue}%`}</Text>
            </View>
          )}
          </View>

          <ScrollView>
          <View style={{flexDirection: 'row', marginTop:10, marginBottom:10, flexWrap:'wrap', justifyContent:'center', gap:10}}>
            {data.map((x, index) => (
              <TouchableOpacity key={index} onPress={()=> onOpenCash(x.id, x.name)} style={{borderWidth:0.5, borderColor: '#2563EB', borderRadius:5, width:'40%', padding:20}}>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={{color:'black', fontWeight:'400', fontSize:10}}>{x.name}</Text>
                      <Text style={{color:'black', fontWeight:'bold', fontSize:15}}>&gt;</Text>
                  </View>
                  <Text style={{color: '#ACACAC', fontSize:8}}>{x.description}</Text>
              </TouchableOpacity>
            ))}
            </View>
                {/* <TouchableOpacity style={{borderWidth:0.5, borderColor: '#2563EB', borderRadius:5, width:'40%', padding:20}}>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={{color:'black', fontWeight:'400', fontSize:10}}>QRIS</Text>
                      <Text style={{color:'black', fontWeight:'bold', fontSize:15}}>&gt;</Text>
                  </View>
                  <Text style={{color: '#ACACAC', fontSize:8}}>Linked to Digital Payment</Text>
              </TouchableOpacity> */}


            {/* <View style={{flexDirection: 'row', marginBottom:0, justifyContent:'space-evenly'}}>
                <TouchableOpacity onPress={()=>onOpenOtherPayment()} style={{borderWidth:0.5, borderColor: '#2563EB', borderRadius:5, width:'40%', padding:20}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:'black', fontWeight:'400', fontSize:10}}>Other Payment</Text>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:15}}>&gt;</Text>
                    </View>
                    <Text style={{color: '#ACACAC', fontSize:8}}>This payment is only as label</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:0.5, borderColor: '#2563EB', borderRadius:5, width:'40%', padding:20, justifyContent:'center'}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:'black', fontWeight:'400', fontSize:10}}>Online Payment</Text>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:15}}>&gt;</Text>
                    </View>
                </TouchableOpacity>
            </View> */}
           
          </ScrollView>
          <View style={{width:'90%', marginVertical:5, backgroundColor: '#2563EB', padding:6, justifyContent: 'center', alignItems:'center', alignSelf:'center', borderRadius:5}}>
            <TouchableOpacity style={{width:'100%', alignItems:'center'}}>
                <Text style={{fontSize:8, fontWeight:'bold', color: 'white'}}>Delete Transaction</Text>
            </TouchableOpacity>
            </View>

          <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>


      <ReceivedCashModal 
        isVisible={isOpenCash} 
        totalPrice={totalPriceState} 
        onClose={onCloseCash}
        onSave={onSave} 
        handleCloseAll={handleCloseAll} 
        paymentID={selectedPaymentID} 
        paymentName={selectedPaymentName}
        customerName={customerName}
        subtotal={subtotal}
        discount={discount}
        tax={tax}
        totalPayment={totalPayment}
        productID={productID}
        qty={qty}
        unitPrice={unitPrice}
        discountProduct={discountProduct}
        notesProduct={notesProduct}
        transactionProductID={transactionProductID}
        transactionProductIDVariant={transactionProductIDVariant}
        variantOptionID={variantOptionID}
        variantLabel={variantLabel}
        variantPrice={variantPrice}
      />

      <OtherPaymentModal isVisible={isOpenOtherPayment} totalPrice={totalPrice} onClose={onCloseOtherPayment}/>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '98%',
    backgroundColor: 'white',
    paddingTop: 20,
    borderRadius: 10,
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    //borderStyle: 'dotted',
    marginBottom: 5,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'grey', 
    fontSize: 15,
  },
  
});

export default PaymentMethodModal;
