import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


interface Props {
  isVisible: boolean;
  onClose: () => void;
  name: string
  onSave: (name: string) => void;
}

const EditOrderModal: React.FC<Props> = ({ isVisible, onClose, name, onSave }) => {


    const [textName, setTextName] = React.useState('');
    const [textNotes, setTextNotes] = React.useState('');

    React.useEffect(() => {
        setTextName(name)
      }, []);
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
            <Text style={styles.modalTitle}>Edit Order</Text>
            <View style={styles.underline}></View>
          </View>
          {/* <View style={{  borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey',}}>
          <Text style={{textAlign:'center', fontSize:10, marginTop:10, color: 'black'}}>Total Bill</Text>
          <Text style={{textAlign:'center', fontSize:15, marginBottom:10, color: '#2563EB', fontWeight: 'bold'}}>Rp {totalPrice}</Text>
          </View> */}
          <View style={{marginVertical:10, gap:10, borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey', paddingBottom:20}}>
            <View style={{marginHorizontal:20, flexDirection:'row', gap:10,  alignItems:'center'}}>
                    <Text style={{fontSize:10, fontWeight:'bold', marginBottom:5, color:'black', }}>Customer Name :</Text>
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
          <View style={{width:'90%', marginTop:5, backgroundColor: '#2563EB', padding:6, justifyContent: 'center', alignItems:'center', alignSelf:'center', borderRadius:5}}>
            <TouchableOpacity onPress={() => onSave(textName)} style={{width:'100%', alignItems:'center'}}>
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
    height: '50%',
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

export default EditOrderModal;
