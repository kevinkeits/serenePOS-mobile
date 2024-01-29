import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Coffee {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface EditItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedItem: Coffee | null; // Add selectedItem prop
}

const EditItemModal: React.FC<EditItemModalProps> = ({ isVisible, onClose, selectedItem }) => {

    const [quantity, setQuantity] = React.useState(1);
    const [options, setOptions] = React.useState({
        option1: false,
        option2: false,
      });
    
    

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      };
    
      const decrementQuantity = () => {
        if (quantity > 1) {
          setQuantity((prevQuantity) => prevQuantity - 1);
        }
      };

      const handleOptionToggle = (option: keyof typeof options) => {
        setOptions((prevOptions) => ({
          ...prevOptions,
          [option]: !prevOptions[option],
        }));
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
            <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
            <View style={styles.underline}></View>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between', borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey'}}>
            <Text style={{justifyContent:'center', marginTop:5, fontSize:10, fontWeight:'bold'}}>Amount </Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.quantityBorder}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
            <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
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
    width: '50%',
    height: '98%',
    backgroundColor: 'white',
    padding: 20,
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
    color: 'grey', // Change color to black
    fontSize: 15,
  },
  quantityContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: '#2563EB',
    padding:7,
    borderRadius: 5,
    
    marginHorizontal: 5,
  },
  quantityBorder: {
    borderWidth: 1,
    borderColor: '#2563EB',
    width:'50%',
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
});

export default EditItemModal;
