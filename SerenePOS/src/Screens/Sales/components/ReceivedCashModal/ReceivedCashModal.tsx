import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TransactionForm } from '../PaymentMethodModal/PaymentMethodModal';


interface Props {
  isVisible: boolean;
  onClose: () => void;
  handleCloseAll: () => void
  loadingSave: boolean
  onSave: (data: TransactionForm) => void;
  totalPrice: number
  paymentID?: string
  paymentName?: string
  customerName?: string
  subtotal?: string
  discount?: string
  tax?: string
  totalPayment?: string
  transactionID?: string
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

const ReceivedCashModal: React.FC<Props> = ({ 
  isVisible, 
  onClose, 
  totalPrice,
   handleCloseAll,
   loadingSave,
   onSave, 
   paymentID, 
   paymentName,
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
   transactionID 
  }) => {


    const [textReceived, setTextReceived] = React.useState('');
    const [textChange, setTextChange] = React.useState('');
    const [textNotes, setTextNotes] = React.useState('');
    const [textTotalPrice, setTextTotalPrice] = React.useState(0);
    const [textSuggesstionOne, setTextSuggesstionOne] = React.useState(0);
    const [textSuggesstionTwo, setTextSuggesstionTwo] = React.useState(0);



    const navigation = useNavigation()

    const handlePressSuggestion = (value: number) => {
      setTextReceived(value.toString())
      var change = value - totalPrice
      setTextChange(change.toString())
    }

    const handleSave = () => {
      if (textReceived != '') {
        const updatedData: TransactionForm = {
          id: transactionID != '' ? transactionID ?? '' : '',
          action: transactionID != '' ? 'edit':'add',
          paymentID: paymentID,
          customerName: customerName,
          subtotal: subtotal,
          discount: discount,
          tax: tax,
          totalPayment: totalPayment,
          paymentAmount: textReceived,
          changes: textChange,
          isPaid: paymentID !== '' ? 'T' : 'F',
          notes: textNotes,
          productID: productID,
          qty: qty,
          unitPrice: unitPrice,
          discountProduct: discountProduct,
          notesProduct: notesProduct,
          transactionProductID: transactionProductID,
          transactionProductIDVariant: transactionProductIDVariant,
          variantOptionID: variantOptionID,
          variantLabel: variantLabel,
          variantPrice: variantPrice,
        };
        console.log(updatedData)
        onSave(updatedData);
      } else {
        Alert.alert('Please input amount received')
      }
    };

    React.useEffect(() => {
      setTextTotalPrice(totalPrice)
      if (totalPrice <= 20000) {
        setTextSuggesstionOne(20000)
        setTextSuggesstionTwo(50000)
      } else if (totalPrice <= 50000) {
        setTextSuggesstionOne(50000)
        setTextSuggesstionTwo(100000)
      } else if (totalPrice <= 100000){
        setTextSuggesstionOne(100000)
      }
    }, [totalPrice]);


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
            <Text style={styles.modalTitle}>{paymentName}</Text>
            <View style={styles.underline}></View>
          </View>
        <ScrollView>
          <View style={{  borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey',}}>
          <Text style={{textAlign:'center', marginTop:10, color: 'black'}}>Total Bill {(parseInt(discount ?? '0') > 0 ? 'after Rp ' + parseInt(discount ?? '0').toLocaleString() + ' discount:' : '')}</Text>
          <Text style={{textAlign:'center', marginBottom:5, color: '#2563EB', fontWeight: '800', fontSize:25}}>Rp {totalPrice.toLocaleString()}</Text>
          </View>
          
          <View style={{marginVertical:5, gap:10, borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey', paddingBottom:20}}>
            <View style={{marginHorizontal:30}}>
                    <Text style={{fontWeight:'bold', marginBottom:5, color:'black'}}>Received</Text>

                    <View style={{  borderBottomWidth:0.5, borderStyle:'dotted', borderColor:'grey', flexDirection:'row', gap:10, paddingVertical:10, justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity onPress={() => handlePressSuggestion(textTotalPrice)} style={{borderWidth:0.5, padding:3, borderRadius:5, width:60, height:40, alignItems:'center', justifyContent:'center'}}>
              <Text style={{textAlign:'center',  color: 'black'}}>{textTotalPrice.toLocaleString()}</Text>
           </TouchableOpacity>
      
           <TouchableOpacity onPress={() => handlePressSuggestion(textSuggesstionOne)} style={{borderWidth:0.5, padding:3, borderRadius:5, width:60, height:40, alignItems:'center', justifyContent:'center'}}>
              <Text style={{textAlign:'center', color: 'black'}}>{textSuggesstionOne.toLocaleString()}</Text>
           </TouchableOpacity>
            {textSuggesstionOne < 100000 && (
              <TouchableOpacity onPress={() => handlePressSuggestion(textSuggesstionTwo)} style={{borderWidth:0.5, padding:3, borderRadius:5, width:60, height:40, alignItems:'center', justifyContent:'center'}}>
                <Text style={{textAlign:'center',  color: 'black'}}>{textSuggesstionTwo.toLocaleString()}</Text>
            </TouchableOpacity>
            )}
           
          </View>

                    <View
                        style={{
                            backgroundColor: textReceived,
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5,
                             marginTop:10
                        }}>
                        <TextInput
                            editable
                            // multiline
                            // numberOfLines={4}
                            placeholder='Type here'
                            keyboardType="numeric"
                            maxLength={40}
                            onChangeText={text => {
                              setTextReceived(text)
                              var change = parseInt(text == '' ? '0' : text) - totalPrice
                                setTextChange(change.toString())
                            }}
                            //value={'Rp ' + parseInt(textReceived == '' ? '0' : textReceived).toLocaleString()}
                            value={textReceived}
                            style={{paddingLeft: 10, paddingVertical:1}}
                        />
                    </View>          
                </View>

                <View style={{marginHorizontal:30}}>
                    <Text style={{fontWeight:'bold', marginBottom:5, color:'black'}}>Changes</Text>
                    <View
                        style={{
                            backgroundColor: '#D2D2D2',
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5,
                        }}>
                        <TextInput
                            editable={false}
                            // multiline
                            // numberOfLines={4}
                            maxLength={40}
                            onChangeText={text => setTextChange(text)}
                            value={textChange == '' ? '0' : parseInt(textChange).toLocaleString()}
                            style={{paddingLeft: 10, paddingVertical:1,color:'black'}}
                        />
                    </View>          
                </View>

                <View style={{marginHorizontal:30}}>
                    <Text style={{ fontWeight:'bold', marginBottom:5, color:'black'}}>Notes</Text>
                    <View
                        style={{
                            backgroundColor: textNotes,
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5
                        }}>
                        <TextInput
                            editable
                            multiline
                            numberOfLines={4}
                            placeholder='Type here'
                            //maxLength={40}
                            onChangeText={text => setTextNotes(text)}
                            value={textNotes}
                            style={{paddingLeft: 10, paddingVertical:1, textAlignVertical: 'top'}}
                        />
                    </View>          
                </View>
          </View>

          </ScrollView>
          <View style={loadingSave ? {backgroundColor:'#D2D2D2'} :{width:'90%', marginBottom:5, backgroundColor: '#2563EB', padding:6, justifyContent: 'center', alignItems:'center', alignSelf:'center', borderRadius:5, height: 32}}>
            <TouchableOpacity onPress={handleSave} style={{width:'100%', alignItems:'center'}} disabled={loadingSave}>
                <Text style={{ fontWeight:'bold', color: 'white'}}>Pay</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  },
  
});

export default ReceivedCashModal;
