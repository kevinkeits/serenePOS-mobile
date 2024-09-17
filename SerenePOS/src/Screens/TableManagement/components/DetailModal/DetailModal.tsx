import React from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import { Table, TableForm } from '../../TableManagement';

interface EditItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (data: TableForm) => void;
  selectedItem: Table | null;
}

const DetailModal: React.FC<EditItemModalProps> = ({ isVisible, onClose, onSave, selectedItem }) => {

  const [capacity, setCapacity] = React.useState('1');
  const [textName, setTextName] = React.useState('');


  const handleClose = () => {
    setTextName('');
    setCapacity('1');
    onClose();
  };

  const handleSave = () => {
    const updatedData: TableForm = {
      id: selectedItem ? selectedItem.id : '',
      action: selectedItem ? 'edit' : 'add',
      tableName: textName,
      capacity: capacity.toString(),
    };
    console.log(updatedData)
    onSave(updatedData);

    setTextName('');
    setCapacity('1');
  };

  React.useEffect(() => {
    console.log(selectedItem?.qrUrl)
    setTextName('');
    setCapacity('1');
    if (selectedItem) {
      setTextName(selectedItem.tableName);
      setCapacity(selectedItem.capacity);
    }
  }, [selectedItem]);

  // Get screen dimensions
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => handleClose()}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { width: screenWidth * 0.7, maxHeight: screenHeight * 0.9 }]}>
          <View style={styles.titleContainer}>
            {selectedItem ? (
              <Text style={styles.modalTitle}>Edit Table</Text>
            ) : (
              <Text style={styles.modalTitle}>Add Table</Text>
            )}
          </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ margin: 10, marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ marginBottom: 5, width: '15%' }}>Name</Text>
              <View style={{
                backgroundColor: textName,
                borderColor: '#D2D2D2',
                borderWidth: 0.5,
                borderRadius: 5,
                width: '80%'
              }}>
                <TextInput
                  editable
                  placeholder='Type here'
                  maxLength={40}
                  onChangeText={text => setTextName(text)}
                  value={textName}
                  style={{ paddingLeft: 10, paddingVertical: 0, width: '100%', height: 32 }}
                />
              </View>
            </View>

            <View style={{ margin: 10, marginVertical: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ marginBottom: 5, width: '15%' }}>Capacity</Text>
              <View style={{
                backgroundColor: textName,
                borderColor: '#D2D2D2',
                borderWidth: 0.5,
                borderRadius: 5,
                width: '80%'
              }}>
                <TextInput
                  editable
                  placeholder='Type here'
                  maxLength={40}
                  onChangeText={text => {
                    const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                    setCapacity(numericText);
                  }}
                  value={capacity.toString()}
                  style={{ paddingLeft: 10, paddingVertical: 0, width: '100%', height: 32 }}
                  keyboardType="numeric" // Show numeric keyboard
                />
              </View>
            </View>

            {selectedItem && (
              <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Scan the QR code:</Text>
                <QRCode
                  value={selectedItem.qrUrl} // The value that will be encoded as a QR code
                  size={100}   // QR code size
                  color="black" // QR code color
                  backgroundColor="white" // QR code background color
                />
                <Text style={{ marginTop: 10, textAlign: 'center', width: 200 }}>
                  Place this QR code on the table for easy menu scanning and ordering.{"\n"}Thank you!
                </Text>
              </View>
            )}
          </ScrollView>

          <View style={{ marginVertical: 5, marginTop: 22, marginHorizontal: 30, justifyContent: 'center', }}>
            <TouchableOpacity onPress={handleSave} style={{ justifyContent: 'center', height: 32, alignItems: 'center', backgroundColor: '#2563EB', padding: 4, borderRadius: 5 }}>
              <Text style={{ color: 'white', fontWeight: '500' }}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleClose} style={{ marginVertical: 10, height: 32, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#D2D2D2', padding: 4, borderRadius: 5 }}>
              <Text style={{ color: 'black', fontWeight: '500' }}>Cancel</Text>
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
    color: 'black',
    marginBottom: 5,
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
  },
});

export default DetailModal;
