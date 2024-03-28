import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';


interface Props {
  isVisible: boolean;
  onClose: () => void;
  selectedIDs: string[]
  onSave?: (ids: string[]) => void;
  onAdd?: (isDiscount: string, type: string, value: string, des: string) => void
  discountOverallValue?: discountOverallProps;
}

export interface discountOverallProps {
  isDiscount: string;
  discountType: string;
  discountValue: string;
  discountDesc: string;
}

interface RadioButtonOptionProps {
    label: string;
    value: string;
  }

  const discountTypeData = [
    { id: '1', label: '%', additionalData: '0' },
    { id: '2', label: 'Rp', additionalData: '0' },
  ];

  const discountData = [
    { id: '1', label: 'No Discount', additionalData: '0' },
    { id: '2', label: 'Discount', additionalData: '0' },
  ];

const DiscountModal: React.FC<Props> = ({ isVisible, onClose, selectedIDs, onSave, onAdd, discountOverallValue }) => {


    const [textDisc, setTextDisc] = React.useState('');
    const [textDesc, setTextDesc] = React.useState('');
    const [radioValue, setRadioValue] = React.useState('1');
    const [radioTypeValue, setRadioTypeValue] = React.useState('1');
    const [discTypeValue, setDiscTypeValue] = React.useState('');



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

      const handleRadio = (option: string) => {
        setRadioValue(option)
        setDiscTypeValue('1')
      };

      const handleDiscountTypePress = (option: string) => {
        setDiscTypeValue(option);
      };


      const handleAddDiscount = () => {
        if (onAdd) onAdd(radioValue, discTypeValue,  textDisc, textDesc )
      }

      const handleClose = () => {
        setDiscTypeValue('')
        setRadioTypeValue('')
        setRadioValue('')
        setTextDisc('')
        setTextDesc('')
        onClose()
      }

      const onOpen = () => {
        setRadioValue('1')

        if (discountOverallValue) {
        setDiscTypeValue(discountOverallValue.discountType)
        setRadioTypeValue('')
        setRadioValue(discountOverallValue.isDiscount)
        setTextDisc(discountOverallValue.discountValue)
        setTextDesc(discountOverallValue.discountDesc)
        }
      }


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => handleClose()}
      onShow={()=> onOpen()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.modalTitle}>Add Discount</Text>
            <View style={styles.underline}></View>
          </View>

            <View style={{marginVertical:10, gap:10, }}>
            {discountData.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionContainer}
                  onPress={() => handleRadio(option.id)}
                >
                  <View style={styles.radioButton}>
                    {radioValue === option.id && <View style={styles.innerCircle} />}
                  </View>
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
                {radioValue == '2' && (
                    <View style={{}}>
                        <View style={{ flexDirection:'row', gap:10,  alignItems:'center', borderBottomColor:'grey', borderStyle:'dotted'}}>
                            <View
                                style={{
                                    backgroundColor: textDisc,
                                    borderColor: '#D2D2D2',
                                    borderWidth: 0.5,
                                    borderRadius:5,
                                    width: '50%',
                                    marginLeft:50
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
                            {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <RadioTypeOption label="Rp" value="1" />
                                <RadioTypeOption label="%" value="2" />
                            </View>           */}
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', gap:4 }}>
                              {discountTypeData.map((option) => (
                                  <TouchableOpacity
                                    key={option.id}
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      marginVertical: 8,
                                    }}
                                    onPress={() => handleDiscountTypePress(option.id)}
                                  >
                                    <Text 
                                    style={[
                                      {color:'black', borderWidth:0.5, marginLeft: 4, width:32, borderColor:'#dfdfdf', borderRadius:3, height:32, textAlign:'center', paddingTop:6},
                                      discTypeValue == option.id && {backgroundColor: '#2563EB', color:'white'}
                                  ]}>{option.label}</Text>
                                  </TouchableOpacity>
                                ))}
                            </View>
                       </View>
                        {/* <View style={{marginTop:20, marginLeft:20}}>
                        <View style={{ flexDirection:'row', gap:10,  }}>
                        <Text style={{fontSize:10, fontWeight:'bold', marginBottom:5, color:'black', }}>Description :</Text>
                            <View
                                style={{
                                    backgroundColor: textDesc,
                                    borderColor: '#D2D2D2',
                                    borderWidth: 0.5,
                                    borderRadius:5,
                                    width: '60%',
                                }}>
                                <TextInput
                                    editable
                                    multiline
                                    numberOfLines={3}
                                    placeholder='Type here'
                                    // maxLength={40}
                                    onChangeText={text => 
                                        setTextDesc(text)
                                    }
                                    value={textDesc}
                                    style={{paddingLeft: 10, paddingVertical:3, width:'80%', textAlignVertical: 'top',}}
                                />
                            </View>
                                 
                       </View> 
                        </View> */}
                    </View>
                )}
            </View>

          <View style={{width:'90%', marginTop:5, marginBottom:20, backgroundColor: '#2563EB', padding:6, justifyContent: 'center', alignItems:'center', alignSelf:'center', borderRadius:5}}>
            <TouchableOpacity style={{width:'100%', alignItems:'center'}} onPress={handleAddDiscount}>
                <Text style={{fontSize:10, fontWeight:'bold', color: 'white'}}>Save</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleClose()} style={styles.closeButton}>
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
    width: '50%',
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    marginLeft: 20,
    marginRight:8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: '#2563EB',
  },
  optionText: {
    color:'black',
    width:'40%'
  },
  additionalText: {
    color:'black',
  },
  
  
});

export default DiscountModal;
