import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import TransferModal from '../TransferModal/TransferModal';


interface Props {
  isVisible: boolean;
  onClose: () => void;
  totalPrice: number
}

const OtherPaymentModal: React.FC<Props> = ({ isVisible, onClose, totalPrice }) => {

    const [isOpenTransfer, setIsOpenTransfer] = React.useState(false);

    const onOpenTransfer = () => {
        setIsOpenTransfer(true);
      };
    
      const onCloseTransfer = () => {
        setIsOpenTransfer(false);
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
            <Text style={styles.modalTitle}>Other Payment</Text>
            <View style={styles.underline}></View>
          </View>
          <View style={{  borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey',}}>
          <Text style={{textAlign:'center', fontSize:10, marginTop:0, color: 'black'}}>Total Bill</Text>
          <Text style={{textAlign:'center', fontSize:12, marginBottom:10, color: '#2563EB', fontWeight: 'bold'}}>Rp {totalPrice}</Text>
          </View>
          <View style={{marginVertical:20, gap:10, paddingBottom:10}}>
            <TouchableOpacity onPress={()=> onOpenTransfer()} style={{marginHorizontal:30, flexDirection:'row', justifyContent:'space-between', backgroundColor:'#2563EB', paddingHorizontal:15, paddingVertical:7, borderRadius:5, alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'white'}}>Transfer</Text>
                    <Text style={{fontSize:10, fontWeight:'bold', color:'white'}}>&gt;</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginHorizontal:30, flexDirection:'row', justifyContent:'space-between', backgroundColor:'#2563EB', paddingHorizontal:15, paddingVertical:7, borderRadius:5, alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'white'}}>Debit</Text>
                    <Text style={{fontSize:10, fontWeight:'bold', color:'white'}}>&gt;</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginHorizontal:30, flexDirection:'row', justifyContent:'space-between', backgroundColor:'#2563EB', paddingHorizontal:15, paddingVertical:7, borderRadius:5, alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'white'}}>Credit</Text>
                    <Text style={{fontSize:10, fontWeight:'bold', color:'white'}}>&gt;</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginHorizontal:30, flexDirection:'row', justifyContent:'space-between', backgroundColor:'#2563EB', paddingHorizontal:15, paddingVertical:7, borderRadius:5, alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'white'}}>Go-pay</Text>
                    <Text style={{fontSize:10, fontWeight:'bold', color:'white'}}>&gt;</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginHorizontal:30, flexDirection:'row', justifyContent:'space-between', backgroundColor:'#2563EB', paddingHorizontal:15, paddingVertical:7, borderRadius:5, alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'white'}}>Shopeepay</Text>
                    <Text style={{fontSize:10, fontWeight:'bold', color:'white'}}>&gt;</Text>
            </TouchableOpacity>

        
          </View>
          
          <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TransferModal isVisible={isOpenTransfer} totalPrice={totalPrice} onClose={onCloseTransfer}/>
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
    width: '70%',
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
    marginBottom: 10,
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

export default OtherPaymentModal;
