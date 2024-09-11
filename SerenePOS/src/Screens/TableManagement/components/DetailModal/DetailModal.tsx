import React from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import { Table, TableForm } from '../../TableManagement';



interface EditItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (data: TableForm) => void;
  selectedItem: Table | null; // Add selectedItem prop
}

const DetailModal: React.FC<EditItemModalProps> = ({ isVisible, onClose, onSave, selectedItem }) => {

    const [capacity, setCapacity] = React.useState('1');
    const [textName, setTextName] = React.useState('');
    const [colorSelection, setColorSelection] = React.useState<string | null>(null);

    const dataQR = "https://example.com";

    const handleClose = () => {
        setTextName('')
        setCapacity('1')
        setColorSelection('#7653DA')
        onClose()
      };

      const handleSave = () => {
        const updatedData: TableForm = {
          id: selectedItem ? selectedItem.id : '',
          action: selectedItem ? 'edit' : 'add',
          name: textName,
          qtyAlert: capacity.toString(),
          bgColor: colorSelection ?? '',
        };
        onSave(updatedData); 

        setTextName('')
        setCapacity('1')
      };

      
    React.useEffect(() => {
      setTextName('')
      setCapacity('1')
        // Set the textName when the modal is opened
        if (selectedItem) {
          setTextName(selectedItem.name)
          setCapacity(selectedItem.qtyAlert)
        }
    }, [selectedItem]);


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => handleClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            {selectedItem ? (
            <Text style={styles.modalTitle}>Edit Table</Text>
            ):(
                <Text style={styles.modalTitle}>Add Table</Text>
            )}
          </View>

          <View style={{margin:10, marginVertical: 10, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ marginBottom:5, width:'15%'}}>Name</Text>
                    <View
                        style={{
                            backgroundColor: textName,
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5,
                            width:'80%'
                        }}>
                        <TextInput
                            editable
                            placeholder='Type here'
                            maxLength={40}
                            onChangeText={text => setTextName(text)}
                            value={textName}
                            style={{paddingLeft: 10, paddingVertical:0, width:'100%', height:32}}
                        />
                    </View>          
        </View>

        <View style={{margin:10, marginVertical: 5, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ marginBottom:5, width:'15%'}}>Capacity</Text>
                    <View
                        style={{
                            backgroundColor: textName,
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5,
                            width:'80%'
                        }}>
                        <TextInput
                            editable
                            placeholder='Type here'
                            maxLength={40}
                            onChangeText={text => {
                                const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                setCapacity(numericText);
                            }}
                            value={capacity}
                            style={{paddingLeft: 10, paddingVertical:0, width:'100%', height:32}}
                            keyboardType="numeric" // Show numeric keyboard
                        />
                    </View>          
        </View>

        {selectedItem && (
        <View style={{  marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Scan the QR code:</Text>
            <QRCode
              value={dataQR} // The value that will be encoded as a QR code
              size={200}   // QR code size
              color="black" // QR code color
              backgroundColor="white" // QR code background color
            />
             <Text style={{ marginTop: 10, textAlign: 'center', width:200 }}>
              Place this QR code on the table for easy menu scanning and ordering.{"\n"}Thank you!
            </Text>
          </View>
        )}

        

        <View style={{marginVertical:5, marginTop: 22, marginHorizontal:30,  justifyContent:'center', }}>
                    <TouchableOpacity onPress={handleSave} style={{justifyContent:'center', height: 32, alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5}}>
                        <Text style={{color:'white', fontWeight:'500'}}>Save</Text>
                    </TouchableOpacity>     

                    <TouchableOpacity onPress={handleClose} style={{marginVertical:10, height: 32, justifyContent:'center', alignItems:'center', borderWidth:0.5, borderColor: '#D2D2D2', padding:4, borderRadius:5}}>
                        <Text style={{color:'black', fontWeight:'500'}}>Cancel</Text>
                    </TouchableOpacity>           
        </View>

         
          <TouchableOpacity onPress={() => handleClose()} style={styles.closeButton}>
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
    width: '50%',
    backgroundColor: 'white',
    paddingTop: 15,
    borderRadius: 10,
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    color:'black',
    marginBottom: 5,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'dotted',
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
    color: 'grey',
  },
  quantityContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 10,
    width: '80%',
  },
  quantityButton: {
    backgroundColor: '#2563EB',
    padding:7,
    borderRadius: 3,
    marginHorizontal: 3,
    height:25,
  },
  quantityBorder: {
    borderWidth: 0.5,
    borderColor: '#D2D2D2',
    width:'90%',
    height:25,
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
    // marginHorizontal: 5,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  colorSelectionContainer: {
    flexDirection: 'row',
    width:'80%',
    justifyContent:'flex-end'
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 2,
    borderWidth:2,
  },
  
});

export default DetailModal;
