import React from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Categories } from '../../Categories';

interface Coffee {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface EditItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedItem: Categories | null; // Add selectedItem prop
}

const DetailModal: React.FC<EditItemModalProps> = ({ isVisible, onClose, selectedItem }) => {

    const [quantity, setQuantity] = React.useState(1);
    const [textName, setTextName] = React.useState('');


    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      };
    
    const decrementQuantity = () => {
        if (quantity > 1) {
          setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleClose = () => {
        setTextName('')
        setQuantity(1)
        onClose()
      };

    React.useEffect(() => {
        // Set the textName when the modal is opened
        if (selectedItem) {
          setTextName(selectedItem.name)
          setQuantity(parseInt(selectedItem.totalItem))
        }
    }, [selectedItem]);


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => handleClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            {selectedItem ? (
            <Text style={styles.modalTitle}>Edit Category</Text>
            ):(
                <Text style={styles.modalTitle}>Add Category</Text>
            )}
          </View>
          <View style={{margin:10, flexDirection:'row', width:'90%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'15%'}}>Name</Text>
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
                            // multiline
                            // numberOfLines={4}
                            placeholder='Type here'
                            maxLength={40}
                            onChangeText={text => setTextName(text)}
                            value={textName}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'100%', height:25}}
                        />
                    </View>          
        </View>
        

        <View style={{marginHorizontal:10, marginVertical:5, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'15%'}}>Qty</Text>
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

        <View style={{marginVertical:5, marginHorizontal:30,  width:'80%', justifyContent:'center', }}>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5}}>
                        <Text style={{fontSize:10, color:'white', fontWeight:'500'}}>Save</Text>
                    </TouchableOpacity>     

                    <TouchableOpacity onPress={handleClose} style={{marginVertical:10, justifyContent:'center', alignItems:'center', borderWidth:0.5, borderColor: '#D2D2D2', padding:4, borderRadius:5}}>
                        <Text style={{fontSize:10, color:'black', fontWeight:'500'}}>Cancel</Text>
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
    backgroundColor: 'white',
    paddingTop: 15,
    borderRadius: 10,
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 11,
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
    color: 'grey', // Change color to black
    fontSize: 15,
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
});

export default DetailModal;