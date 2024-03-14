import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';


interface Props {
  isVisible: boolean;
  onClose: () => void;
  selectedIDs: string[]
  onSave?: (ids: string[]) => void;
}

interface RadioButtonOptionProps {
    label: string;
    value: string;
  }

const DiscountModal: React.FC<Props> = ({ isVisible, onClose, selectedIDs, onSave }) => {


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
          <View style={styles.titleContainer}>
            <Text style={styles.modalTitle}>Add Discount</Text>
            <View style={styles.underline}></View>
          </View>

            <View style={{marginVertical:10, gap:10, }}>
                <View style={styles.radioContainer}>
                    <RadioButtonOption label="No Discount" value="1" />
                    <RadioButtonOption label="Add Discount" value="2" />
                </View>
                {radioValue == '2' && (
                    <View style={{}}>
                        <View style={{ flexDirection:'row', gap:10,  alignItems:'center', borderBottomWidth:1, borderBottomColor:'grey', borderStyle:'dotted', paddingBottom:20}}>
                            <View
                                style={{
                                    backgroundColor: textDisc,
                                    borderColor: '#D2D2D2',
                                    borderWidth: 0.5,
                                    borderRadius:5,
                                    width: '60%',
                                    marginLeft:20
                                }}>
                                <TextInput
                                    editable
                                    // multiline
                                    // numberOfLines={4}
                                    placeholder='Type here'
                                    maxLength={40}
                                    onChangeText={text => 
                                        setTextDisc(text)
                                    }
                                    value={textDisc}
                                    style={{paddingLeft: 10, paddingVertical:1, fontSize:10}}
                                />
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <RadioTypeOption label="Rp" value="1" />
                                <RadioTypeOption label="%" value="2" />
                            </View>          
                       </View>
                        <View style={{marginTop:20, marginLeft:20}}>
                        <View style={{ flexDirection:'row', gap:10,  alignItems:'center',}}>
                        <Text style={{fontSize:10, fontWeight:'bold', marginBottom:5, color:'black', }}>Discount Name :</Text>
                            <View
                                style={{
                                    backgroundColor: textName,
                                    borderColor: '#D2D2D2',
                                    borderWidth: 0.5,
                                    borderRadius:5,
                                    width: '60%',
                                }}>
                                <TextInput
                                    editable
                                    // multiline
                                    // numberOfLines={4}
                                    placeholder='Type here'
                                    maxLength={40}
                                    onChangeText={text => 
                                        setTextName(text)
                                    }
                                    value={textName}
                                    style={{paddingLeft: 10, paddingVertical:1, fontSize:10}}
                                />
                            </View>
                                 
                       </View> 
                        </View>
                    </View>
                )}
            </View>

          <View style={{width:'90%', marginTop:5, marginBottom:20, backgroundColor: '#2563EB', padding:6, justifyContent: 'center', alignItems:'center', alignSelf:'center', borderRadius:5}}>
            <TouchableOpacity style={{width:'100%', alignItems:'center'}}>
                <Text style={{fontSize:10, fontWeight:'bold', color: 'white'}}>Save</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>x</Text>
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
    //height: '50%',
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

export default DiscountModal;
