import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OtherPaymentModal from '../OtherPayment/OtherPayment';
import ReceivedCashModal from '../ReceivedCashModal/ReceivedCashModal';


interface Props {
  isVisible: boolean;
  onClose: () => void;
  totalPrice: number
}

const PaymentMethodModal: React.FC<Props> = ({ isVisible, onClose, totalPrice }) => {

    const [isOpenCash, setIsOpenCash] = React.useState(false);
    const [totalPriceState, setTotalPriceState] = React.useState(0);
    const [isOpenOtherPayment, setIsOpenOtherPayment] = React.useState(false);

    const onOpenCash = () => {
        setIsOpenCash(true);
        setTotalPriceState(totalPrice);
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
          <Text style={{textAlign:'center', fontSize:15, marginBottom:10, color: '#2563EB', fontWeight: 'bold'}}>Rp {totalPrice}</Text>
          </View>
          <View>
            <View style={{flexDirection: 'row', marginTop:10, marginBottom:10, justifyContent:'space-evenly'}}>
                <TouchableOpacity onPress={()=> onOpenCash()} style={{borderWidth:0.5, borderColor: '#2563EB', borderRadius:5, width:'40%', padding:20}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:'black', fontWeight:'400', fontSize:10}}>Cash</Text>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:15}}>&gt;</Text>
                    </View>
                    <Text style={{color: '#ACACAC', fontSize:8}}>Payment Cash</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:0.5, borderColor: '#2563EB', borderRadius:5, width:'40%', padding:20}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:'black', fontWeight:'400', fontSize:10}}>QRIS</Text>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:15}}>&gt;</Text>
                    </View>
                    <Text style={{color: '#ACACAC', fontSize:8}}>Linked to Digital Payment</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', marginBottom:0, justifyContent:'space-evenly'}}>
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
            </View>
            <View style={{width:'90%', marginTop:10, backgroundColor: '#2563EB', padding:6, justifyContent: 'center', alignItems:'center', alignSelf:'center', borderRadius:5}}>
            <TouchableOpacity style={{width:'100%', alignItems:'center'}}>
                <Text style={{fontSize:8, fontWeight:'bold', color: 'white'}}>Delete Transaction</Text>
            </TouchableOpacity>
          </View>

          </View>
          <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ReceivedCashModal isVisible={isOpenCash} totalPrice={totalPriceState} onClose={onCloseCash} />
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
    backgroundColor: 'white', // Change background color to transparent
    padding: 8,
    borderRadius: 5,
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'grey', // Change color to black
    fontSize: 15,
  },
  
});

export default PaymentMethodModal;
