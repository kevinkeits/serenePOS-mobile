import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';


interface Props {
  isVisible: boolean;
  onClose: () => void;
  selectedID: string
  onSave?: (ids: string[]) => void;
}

interface RadioButtonOptionProps {
    label: string;
    value: string;
  }

const DetailModal: React.FC<Props> = ({ isVisible, onClose, selectedID, onSave }) => {

    const navigation = useNavigation();

    const [textDisc, setTextDisc] = React.useState('');
    const [textName, setTextName] = React.useState('');
    const [radioValue, setRadioValue] = React.useState('1');
    const [radioTypeValue, setRadioTypeValue] = React.useState('1');


    const RadioButtonOption: React.FC<RadioButtonOptionProps> = ({ label, value }) => (
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value={value}
            status={radioValue === value ? 'checked' : 'unchecked'}
            onPress={() => setRadioValue(value)}
          />
          <Text style={{fontSize:10, color:'black'}}>{label}</Text>
        </View>
      );

      const RadioTypeOption: React.FC<RadioButtonOptionProps> = ({ label, value }) => (
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <RadioButton
            value={value}
            status={radioTypeValue === value ? 'checked' : 'unchecked'}
            onPress={() => setRadioTypeValue(value)}
          />
          <Text style={{fontSize:10, color:'black'}}>{label}</Text>
        </View>
      );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.modalTitle}>Transaction History</Text>
            <View style={styles.underline}></View>
          </View>

            <View style={{marginVertical:10, gap:10, }}>
            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', flexDirection:'row', justifyContent:'space-between', padding:5, marginHorizontal:10}}>
                <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Transaction Details</Text>
                <Text style={{fontSize:10, color:'black'}}>#001</Text>
            </View>
            <View style={{borderBottomWidth:2, borderBottomColor:'#E1E1E1',gap:9, paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Transaction Date</Text>
                    <Text style={{fontSize:10, color:'black'}}>05-Feb-2023 23:11:53</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Transaction No</Text>
                    <Text style={{fontSize:10, color:'black'}}>SE05022023</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Cashier Name</Text>
                    <Text style={{fontSize:10, color:'black'}}>Reza</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Outlet</Text>
                    <Text style={{fontSize:10, color:'black'}}>Bogor</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Payment Method</Text>
                    <Text style={{fontSize:10, color:'black'}}>Debit</Text>
                </View>
            </View>
            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', flexDirection:'row', justifyContent:'space-between', paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Product Details</Text>
            </View>

            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', gap:9,  paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Simple Toast</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp 5.000</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Qty</Text>
                    <Text style={{fontSize:10, color:'black'}}>x1</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Total</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp 5.000</Text>
                </View>            
            </View>

            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', gap:9,  paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Subtotal</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp 5.000</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Discount</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp 0</Text>
                </View>
            </View>

            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', flexDirection:'row', justifyContent:'space-between', paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Total Payment</Text>
                <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Rp 5.000</Text>
            </View>

            <View style={{ gap:9,  paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Paid</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp 5.000</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Change</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp 0</Text>
                </View>
            </View>


            </View>

          <View style={{width:'90%', marginTop:5, marginBottom:10, backgroundColor: '#2563EB', padding:6, justifyContent: 'center', alignItems:'center', alignSelf:'center', borderRadius:5}}>
            <TouchableOpacity style={{width:'100%', alignItems:'center'}}>
                <Text style={{fontSize:10, fontWeight:'bold', color: 'white'}}>Pay Now</Text>
            </TouchableOpacity>          
          </View>

          <View style={{width:'90%', marginBottom:20, backgroundColor: '#2563EB', padding:6, justifyContent: 'center', alignItems:'center', alignSelf:'center', borderRadius:5}}>
            <TouchableOpacity style={{width:'100%', alignItems:'center'}}>
                <Text style={{fontSize:10, fontWeight:'bold', color: 'white'}}>Print Receipt</Text>
            </TouchableOpacity>          
          </View>

          <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
          </ScrollView>
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
    //height: '50%',
    backgroundColor: 'white',
    paddingTop: 10,
    borderRadius: 10,
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 11,
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
    top: 0,
    right: 8,
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
  radioContainer: {
    marginLeft:20
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'space-around',
    //marginTop: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
});

export default DetailModal;
