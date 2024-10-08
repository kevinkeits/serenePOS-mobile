import React from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TableForm } from '../../TableManagement';

interface EditItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (data: TableForm) => void;
  selectedItems: string[]
}

const ConfirmationModal: React.FC<EditItemModalProps> = ({ isVisible, onClose, selectedItems, onSave }) => {

  const handleSave = () => {
    const updatedData: TableForm = {
      id: selectedItems.join(','),
      action: 'delete',
    };
    onSave(updatedData); 
    onClose()
  };


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
          <Text style={styles.modalTitle}>Confirmation</Text>
          </View>
         

        <View style={{marginVertical:5, marginHorizontal:30,  width:'90%', justifyContent:'center', }}>
                    <Text style={{color:'black', marginTop:5, marginBottom:32, textAlign:'center' }}>Are you sure want to delete ({selectedItems?.length}) table{selectedItems.length > 1 ? 's' : ''}?</Text>
                    <TouchableOpacity  onPress={handleSave} style={{justifyContent:'center', alignItems:'center', backgroundColor:'#EF4444', padding:4, borderRadius:5, height: 32}}>
                        <Text style={{color:'white', fontWeight:'500'}}>Yes</Text>
                    </TouchableOpacity>     

                    <TouchableOpacity onPress={onClose} style={{marginVertical:10, justifyContent:'center', alignItems:'center', borderWidth:0.5, borderColor: '#D2D2D2', padding:4, borderRadius:5, height: 32}}>
                        <Text style={{color:'black', fontWeight:'500'}}>No</Text>
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

export default ConfirmationModal;
